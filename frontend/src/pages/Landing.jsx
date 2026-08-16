import {
  ArrowRight,
  CalendarCheck,
  Flame,
  Target,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Landing() {

  return (
    <div className="
      min-h-screen
      bg-slate-50
    ">

      {/* =====================================
          HERO
      ====================================== */}

      <section className="
        relative
        overflow-hidden
        bg-linear-to-br
        from-slate-950
        via-cyan-900
        to-sky-700
        text-white
      ">

        {/* Decorative circles */}

        <div className="
          absolute
          -right-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-white/10
          blur-3xl
        " />

        <div className="
          absolute
          -bottom-40
          -left-32
          h-96
          w-96
          rounded-full
          bg-cyan-300/10
          blur-3xl
        " />


        <Navbar transparent />


        <div className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-12
          px-6
          py-20
          lg:grid-cols-2
          lg:px-8
          lg:py-28
        ">

          {/* TEXT */}

          <div>
            <h1 className="
              text-5xl
              font-extrabold
              leading-tight
              tracking-tight
              sm:text-3xl
              lg:text-3xl
            ">

              PLAN FOR A

              <br />

              <span className="text-cyan-200">
                BETTER CHANGE.
              </span>

            </h1>


            <p className="
              mt-6
              max-w-xl
              text-base
              leading-7
              text-white/75
              sm:text-lg
            ">
              Track your daily and weekly habits,
              build consistency, and turn small
              actions into meaningful routines with
              Coven.
            </p>


            {/* BUTTONS */}

            <div className="
              mt-8
              flex
              flex-wrap
              gap-4
            ">

              <Link
                to="/register"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-6
                  py-3
                  font-bold
                  text-cyan-950
                  shadow-xl
                  transition
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                Get Started

                <ArrowRight size={18} />
              </Link>


              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/30
                  bg-white/10
                  px-6
                  py-3
                  font-semibold
                  backdrop-blur
                  transition
                  hover:bg-white/20
                "
              >
                Log In
              </Link>

            </div>


            {/* BENEFITS */}

            <div className="
              mt-8
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-sm
              text-white/70
            ">

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Daily tracking
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Streak counter
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Personal dashboard
              </span>

            </div>

          </div>


          {/* IMAGE */}

          <div className="
            flex
            justify-center
            lg:justify-end
          ">

            <div className="relative">

              <div className="
                absolute
                inset-10
                rounded-full
                bg-cyan-300/20
                blur-3xl
              " />

              <img
                src="/images/hero-productivity.png"
                alt="Coven productivity illustration"
                className="
                  relative
                  z-10
                  w-full
                  max-w-lg
                  object-contain
                  drop-shadow-2xl
                  transition
                  duration-500
                  hover:-translate-y-2
                "
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          VISUAL SECTION
      ====================================== */}

      <section 
      id="features"
        className="
        bg-white
        px-6
        py-24
      ">

        <div className="
          mx-auto
          grid
          max-w-6xl
          items-center
          gap-12
          lg:grid-cols-2
        ">

          <div>

            <p className="
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-700
            ">
              STAY ON TRACK
            </p>

            <p className="
              mt-5
              leading-7
              text-slate-500
            ">
              Coven gives you a simple dashboard
              where your habits, streaks, and
              completion progress are easy to see.
            </p>


            <div className="
              mt-7
              space-y-4
            ">

              <InfoRow
                icon={<Flame size={19} />}
                text="Monitor your current streak"
              />

              <InfoRow
                icon={<CalendarCheck size={19} />}
                text="Track daily completion"
              />

              <InfoRow
                icon={<BarChart3 size={19} />}
                text="Understand your consistency"
              />

            </div>

          </div>


          {/* Dashboard preview */}

          <div className="
            rounded-3xl
            bg-linear-to-br
            from-slate-950
            via-blue-950
            to-cyan-900
            p-6
            shadow-2xl
          ">

            <div className="
              rounded-2xl
              bg-white/10
              p-5
              backdrop-blur
            ">

              <p className="
                text-sm
                text-white/60
              ">
                Today's progress
              </p>


              <div className="
                mt-2
                text-4xl
                font-bold
                text-white
              ">
                75%
              </div>


              <div className="
                mt-5
                h-3
                overflow-hidden
                rounded-full
                bg-white/10
              ">

                <div className="
                  h-full
                  w-3/4
                  rounded-full
                  bg-linear-to-r
                  from-cyan-300
                  to-teal-300
                />

              </div>


              <div className="
                mt-7
                grid
                grid-cols-3
                gap-3
              />

                <PreviewCard
                  icon={<Target size={18} />}
                  number="4"
                  label="Habits"
                />

                <PreviewCard
                  icon={<CheckCircle2 size={18} />}
                  number="3"
                  label="Done"
                />

                <PreviewCard
                  icon={<Flame size={18} />}
                  number="7"
                  label="Streak"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}


/* =========================================
   INFO ROW
========================================= */

function InfoRow({
  icon,
  text,
}) {

  return (
    <div className="
      flex
      items-center
      gap-3
      text-slate-700
    ">

      <div className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-cyan-50
        text-cyan-700
      ">
        {icon}
      </div>

      <span className="font-medium">
        {text}
      </span>

    </div>
  );
}


/* =========================================
   PREVIEW CARD
========================================= */

function PreviewCard({
  icon,
  number,
  label,
}) {

  return (
    <div className="
      rounded-xl
      bg-white/10
      p-4
      text-white
    ">

      <div className="text-cyan-200">
        {icon}
      </div>

      <p className="
        mt-3
        text-xl
        font-bold
      ">
        {number}
      </p>

      <p className="
        text-xs
        text-white/50
      ">
        {label}
      </p>

    </div>
  );
}


export default Landing;