import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
 <main className="
      min-h-screen
      bg-linear-to-br
      from-slate-100
      via-white
      to-cyan-50
      px-4
      py-8
      sm:px-5
      lg:px-6
    ">

      {/* BACK TO HOME */}

      <div className="
        mx-auto
        max-w-6xl
      ">

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


        {/* AUTHENTICATION CARD */}

        <div className="
          relative
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
        ">


          {/* =====================================
              LEFT VISUAL PANEL
          ====================================== */}

          <div className="
            relative
            hidden
            overflow-hidden
            bg-linear-to-br
            from-slate-950
            via-blue-950
            to-cyan-800
            lg:flex
          ">

            {/* Large decorative circles */}

            <div className="
              absolute
              -left-32
              -top-32
              h-96
              w-96
              rounded-full
              bg-cyan-400/20
              blur-2xl
            " />

            <div className="
              absolute
              -bottom-32
              -right-32
              h-96
              w-96
              rounded-full
              bg-blue-400/20
              blur-3xl
            " />


            {/* Organic curved shape */}

            <div className="
              absolute
              -right-24
              -top-20
              h-[130%]
              w-72
              rotate-[8deg]
              rounded-[50%]
              bg-linear-to-br
              from-cyan-300/20
              via-cyan-400/10
              to-transparent
              blur-sm
            " />


            {/* Content */}

            <div className="
              relative
              z-10
              flex
              w-full
              flex-col
              justify-between
              p-10
              text-white
            ">

              {/* Logo */}

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


              {/* Main visual */}

              <div>

                <p className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-cyan-200
                ">
                  Welcome back
                </p>

                <p className="
                  mt-5
                  max-w-sm
                  leading-7
                  text-white/60
                ">
                  Keep your routines consistent and
                  continue building the version of
                  yourself you're working towards.
                </p>


                <div className="
                  mt-8
                  space-y-4
                ">

                  <AuthBenefit text="Track your daily habits" />

                  <AuthBenefit text="Maintain your streaks" />


                </div>

              </div>


              <p className="
                text-xs
                text-white/40
              ">
              </p>

            </div>

          </div>


          {/* =====================================
              LOGIN FORM
          ====================================== */}

          <div className="
            flex
            items-center
            bg-white
            px-6
            py-10
            sm:px-10
            lg:px-14
          ">

            <div className="
              mx-auto
              w-full
              max-w-md
            ">

              {/* MOBILE LOGO */}

              <div className="
                mb-10
                lg:hidden
              ">

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


              <div>
                <h4 className="
                  mt-2
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                ">
                  Log in to Coven
                </h4>


              </div>


              {/* =================================
                  KEEP YOUR EXISTING FORM
              ================================== */}

              <form
                onSubmit={handleSubmit}
                className="
                  mt-8
                  space-y-5
                "
              >

                {/* EMAIL */}

                <div>

                  <label className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  ">
                    Email Address
                  </label>


                  <div className="
                    relative
                  ">

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
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}

                      required
                      placeholder="Enter your email"
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

                  <label className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  ">
                    Password
                  </label>


                  <div className="
                    relative
                  ">

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
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      
                      required
                      placeholder="Enter your password"
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


                {/* ERROR */}

                {error && (
                  <div className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                  ">
                    {error}
                  </div>
                )}


                {/* SUBMIT */}

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
                    disabled:hover:translate-y-0
                  "
                >
                  {loading ? (
                    <>
                      <span className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "></span>

                      Logging in...
                    </>
                  ) : (
                    <>
                      Log In

                      <ArrowRight size={18} />
                    </>
                  )}

                </button>

              </form>


              {/* REGISTER */}

              <p className="
                mt-7
                text-center
                text-sm
                text-slate-500
              ">

                Don't have an account?

                <Link
                  to="/register"
                  className="
                    ml-1
                    font-bold
                    text-cyan-800
                    hover:text-cyan-950
                  "
                >
                  Sign up
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================
   BENEFIT
========================================= */

function AuthBenefit({ text }) {

  return (
    <div className="
      flex
      items-center
      gap-3
      text-sm
      text-white/70
    ">

      <CheckCircle2
        size={17}
        className="text-cyan-200"
      />

      {text}

    </div>
  );
}

export default Login;