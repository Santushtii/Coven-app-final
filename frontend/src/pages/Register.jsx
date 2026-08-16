import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  // ==============================
  // FORM STATE
  // ==============================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // HANDLE INPUT CHANGES
  // ==============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ==============================
  // HANDLE REGISTRATION
  // ==============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      const { token, user } = response.data;

      // Store authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect after successful registration
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-linear-to-br
        from-slate-100
        via-white
        to-cyan-50
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* =====================================
            BACK TO HOME
        ====================================== */}

        <Link
          to="/"
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:text-cyan-800
          "
        >
          <ArrowLeft size={17} />

          Back to Coven
        </Link>


        {/* =====================================
            MAIN AUTH CARD
        ====================================== */}

        <div
          className="
            mx-auto
            grid
            max-w-5xl
            overflow-hidden
            rounded-4xl
            bg-white
            shadow-2xl
            ring-1
            ring-slate-200
            lg:min-h-162.5
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >

          {/* =====================================
              LEFT VISUAL SECTION
          ====================================== */}

          <section
            className="
              relative
              hidden
              overflow-hidden
              bg-linear-to-br
              from-slate-950
              via-blue-950
              to-cyan-800
              lg:flex
            "
          >

            {/* Decorative circle 1 */}

            <div
              className="
                absolute
                -left-32
                -top-32
                h-96
                w-96
                rounded-full
                bg-cyan-400/20
                blur-3xl
              "
            />


            {/* Decorative circle 2 */}

            <div
              className="
                absolute
                -bottom-32
                -right-32
                h-96
                w-96
                rounded-full
                bg-blue-400/20
                blur-3xl
              "
            />


            {/* Organic curved shape */}

            <div
              className="
                absolute
                -right-28
                -top-20
                h-[125%]
                w-72
                rotate-[8deg]
                rounded-[50%]
                bg-linear-to-br
                from-cyan-300/20
                via-cyan-400/10
                to-transparent
              "
            />


            {/* Smaller decorative shape */}

            <div
              className="
                absolute
                bottom-20
                left-16
                h-28
                w-28
                rounded-full
                border
                border-cyan-200/10
                bg-cyan-300/5
                backdrop-blur-sm
              "
            />


            {/* =================================
                LEFT CONTENT
            ================================== */}

            <div
              className="
                relative
                z-10
                flex
                w-full
                flex-col
                justify-between
                p-10
                text-white
              "
            >

              {/* LOGO */}

              <Link
                to="/"
                className="
                  font-serif
                  text-2xl
                  font-semibold
                  italic
                "
              >
                Coven
              </Link>


              {/* MAIN MESSAGE */}

              <div>

                {/* Label */}

                <p
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-cyan-200
                  "
                >
                  Start your journey
                </p>

                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-sm
                    leading-7
                    text-white/60
                  "
                >
                  Create simple routines
                </p>


                {/* BENEFITS */}

                <div className="mt-8 space-y-4">

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-white/70
                    "
                  >
                    <CheckCircle2
                      size={18}
                      className="text-cyan-200"
                    />

                    Track your daily habits
                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-white/70
                    "
                  >
                    <CheckCircle2
                      size={18}
                      className="text-cyan-200"
                    />

                    Maintain your streaks
                  </div>

                </div>

              </div>


              {/* BOTTOM TEXT */}

              <p className="text-xs text-white/40">
              </p>

            </div>

          </section>


          {/* =====================================
              RIGHT FORM SECTION
          ====================================== */}

          <section
            className="
              flex
              items-center
              bg-white
              px-6
              py-10
              sm:px-10
              lg:px-14
            "
          >

            <div className="mx-auto w-full max-w-md">

              {/* MOBILE LOGO */}

              <div className="mb-10 lg:hidden">

                <Link
                  to="/"
                  className="
                    font-serif
                    text-2xl
                    font-semibold
                    italic
                    text-slate-900
                  "
                >
                  Coven
                </Link>

              </div>


              {/* =================================
                  FORM HEADER
              ================================== */}

              <div>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Create Coven Account
                </h2>


              </div>


              {/* =================================
                  ERROR MESSAGE
              ================================== */}

              {error && (
                <div
                  className="
                    mt-6
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                  "
                >
                  {error}
                </div>
              )}


              {/* =================================
                  REGISTER FORM
              ================================== */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Name
                  </label>


                  <div className="relative">

                    <UserRound
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />


                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-600
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-100
                      "
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Email
                  </label>


                  <div className="relative">

                    <Mail
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />


                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-600
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-100
                      "
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Password
                  </label>


                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />


                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-cyan-600
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-100
                      "
                    />

                  </div>


                  <p className="mt-2 text-xs text-slate-400">
                    Password must contain at least 6 characters.
                  </p>

                </div>


                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-linear-to-r
                    from-slate-950
                    via-blue-950
                    to-cyan-800
                    px-5
                    py-3.5
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    focus:outline-none
                    focus:ring-4
                    focus:ring-cyan-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {loading ? (
                    <>
                      <span
                        className="
                          h-4
                          w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-white/30
                          border-t-white
                        "
                      />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <ArrowRight size={18} />
                    </>
                  )}

                </button>

              </form>


              {/* =================================
                  LOGIN LINK
              ================================== */}

              <p
                className="
                  mt-7
                  text-center
                  text-sm
                  text-slate-500
                "
              >
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="
                    font-bold
                    text-cyan-800
                    transition
                    hover:text-cyan-950
                  "
                >
                  Login
                </Link>

              </p>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}

export default Register;