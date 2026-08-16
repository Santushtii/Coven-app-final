import { useEffect, useState } from "react";

function HabitForm({
  habit,
  onSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Health",
  });

  useEffect(() => {
    if (habit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: habit.name,
        category: habit.category,
      });
    }
  }, [habit]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);

    setFormData({
      name: "",
      category: "Health",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-cyan-950/60 p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-white">
            {habit ? "Edit Habit" : "Add Habit"}
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-slate-400 hover:text-white"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Habit name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Read for 30 minutes"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
            >
              <option value="Health">Health</option>
              <option value="Study">Study</option>
              <option value="Fitness">Fitness</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-950"
            >
              {habit ? "Save Changes" : "Add Habit"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default HabitForm;