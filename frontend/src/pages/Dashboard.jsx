import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import HabitCard from "../components/HabitCard";
import HabitForm from "../components/HabitForm";

import api from "../services/api";

function Dashboard() {
  const [habits, setHabits] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingHabit, setEditingHabit] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================================
  // GET HABITS
  // ==========================================

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/habits");

      setHabits(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load habits."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHabits();
  }, [fetchHabits]);


  // ==========================================
  // CREATE OR UPDATE HABIT
  // ==========================================

  const handleSubmit = async (formData) => {
    try {
      if (editingHabit) {
        await api.put(
          `/habits/${editingHabit._id}`,
          formData
        );
      } else {
        await api.post("/habits", formData);
      }

      setShowForm(false);
      setEditingHabit(null);

      await fetchHabits();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save habit."
      );
    }
  };


  // ==========================================
  // DELETE HABIT
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this habit?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/habits/${id}`);

      await fetchHabits();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete habit."
      );
    }
  };


  // ==========================================
  // TOGGLE TODAY'S COMPLETION
  // ==========================================

  const handleToggle = async (id) => {
    try {
      await api.patch(`/habits/${id}/toggle`);

      await fetchHabits();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update habit."
      );
    }
  };


  // ==========================================
  // EDIT HABIT
  // ==========================================

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };


  // ==========================================
  // ADD HABIT
  // ==========================================

  const handleAdd = () => {
    setEditingHabit(null);
    setShowForm(true);
  };


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-cyan-50">

      {/* ======================================
          NAVBAR
      ======================================= */}

      <Navbar className="  
        bg-linear-to-br
        from-slate-950
        via-cyan-900
        to-sky-700
        text-white" />

      {/* ======================================
          MAIN CONTENT WRAPPER
          - Now wraps EVERYTHING to apply consistent
            max-width and left/right padding.
      ======================================= */}

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ======================================
            DASHBOARD HERO
        ======================================= */}

        <section
          className="
            relative
            mb-8
            overflow-hidden
            rounded-4xl
            bg-white
            px-6
            py-8
            shadow-xl
            sm:px-8
            lg:px-10
          "
        >
          {/* Hero content */}
          <div>
              <p
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-cyan-700
                "
              >
                Your personal space
              </p>


              <h1
                className="
                  mt-2
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                  sm:text-4xl
                "
              >
                Welcome back
                {user?.name ? `, ${user.name}` : ""}
              </h1>


              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-600
                  sm:text-base
                "
              >
                Stay consistent, track your progress,
                and build habits that last.
              </p>

            </div>


            {/* Add habit */}

            <button
              onClick={handleAdd}
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-3.5
                font-bold
                text-slate-950
                shadow-lg
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-cyan-50
                hover:shadow-xl
              "
            >
              <span
                className="
                  text-xl
                  leading-none
                  text-cyan-700
                  transition
                  group-hover:scale-110
                "
              >
                +
              </span>

              Add Habit
            </button>

        </section>

        {/* ======================================
            ERROR MESSAGE
        ======================================= */}

        {error && (
          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-700
              shadow-sm
            "
          >

            <span className="text-base">
              !
            </span>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* ======================================
            HABITS SECTION HEADER
        ======================================= */}

        <div
          className="
            mb-5
            flex
            flex-col
            justify-between
            gap-3
            sm:flex-row
            sm:items-end
          "
        >

          <div>

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-cyan-700
              "
            >
              Your routine
            </p>

            <h2
              className="
                mt-1
                text-2xl
                font-extrabold
                text-slate-900
              "
            >
              Your Habits
            </h2>

          </div>


          {habits.length > 0 && (
            <p className="text-sm text-slate-500">
              {habits.length}{" "}
              {habits.length === 1 ? "habit" : "habits"}{" "}
              being tracked
            </p>
          )}

        </div>


        {/* ======================================
            LOADING / EMPTY / HABIT GRID
        ======================================= */}

        {loading ? (

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
            "
          >

            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-cyan-700
              "
            />

            <p className="mt-5 text-sm text-slate-500">
              Loading your habits...
            </p>

          </div>

        ) : habits.length === 0 ? (

          /* ====================================
             EMPTY STATE
          ===================================== */

          <div
            className="
              relative
              overflow-hidden
              rounded-4xl
              border
              border-dashed
              border-slate-300
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
            "
          >

            {/* Decorative background */}

            <div
              className="
                absolute
                left-1/2
                top-0
                h-40
                w-40
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-cyan-100/60
                blur-2xl
              "
            />


            <div className="relative z-10">

              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-[1.75rem]
                  bg-linear-to-br
                  from-slate-950
                  via-blue-950
                  to-cyan-800
                  text-3xl
                  text-white
                  shadow-xl
                "
              >
                +
              </div>


              <h2
                className="
                  mt-6
                  text-2xl
                  font-extrabold
                  text-slate-900
                "
              >
                No habits yet
              </h2>


              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Start with one small habit.
                Create your first routine and
                begin building your streak.
              </p>


              <button
                onClick={handleAdd}
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-linear-to-r
                  from-slate-950
                  via-blue-950
                  to-cyan-800
                  px-6
                  py-3.5
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                "
              >
                <span className="text-lg">
                  +
                </span>

                Create your first habit
              </button>

            </div>

          </div>

        ) : (

          /* ====================================
             HABIT GRID
             cards have proper left/right spacing
          ===================================== */

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}

          </div>

        )}

        {/* ======================================
            ADD / EDIT MODAL
            - Placed inside <main> so it inherits the same context
        ======================================= */}

        {showForm && (
          <HabitForm
            habit={editingHabit}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingHabit(null);
            }}
          />
        )}

      </main>
    </div>
  );
}

export default Dashboard;