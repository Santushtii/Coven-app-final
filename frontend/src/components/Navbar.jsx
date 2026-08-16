import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";


function Navbar({ transparent = false, className = "" }) {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    navigate("/login");
  };


  return (
    <nav
      className={`
        relative z-50
        w-full
        border-b
        ${
          className || (transparent
            ? "border-white/10 bg-transparent text-white"
            : "border-slate-200 bg-white/90 text-slate-800 backdrop-blur-xl")
        }
      `}
    >

      <div className="
        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        px-6
        py-4
        lg:px-8
      ">

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


        {/* DESKTOP */}

        <div className="
          hidden
          items-center
          gap-7
          md:flex
        ">

          <Link
            to="/"
            className="
              text-sm
              font-medium
              opacity-80
              transition
              hover:opacity-100
            "
          >
            Home
          </Link>

          <a
            href="/#features"
            className="
              text-sm
              font-medium
              opacity-80
              transition
              hover:opacity-100
            "
          >
            Features
          </a>


          {token ? (
            <>
              <Link
                to="/dashboard"
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition
                  ${
                    transparent
                      ? "border border-white/30 bg-white/10 hover:bg-white/20"
                      : "bg-slate-950 text-white hover:bg-cyan-900"
                  }
                `}
              >
                <LayoutDashboard size={16} />

                Dashboard
              </Link>


              <button
                onClick={logout}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  opacity-80
                  transition
                  hover:opacity-100
                "
              >
                <LogOut size={16} />

                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                "
              >
                <LogIn size={16} />

                Log In
              </Link>


              <Link
                to="/register"
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  transition
                  ${
                    transparent
                      ? "border border-white/30 bg-white/10 hover:bg-white/20"
                      : "bg-cyan-800 text-white hover:bg-cyan-900"
                  }
                `}
              >
                <UserPlus size={16} />

                Sign Up
              </Link>
            </>
          )}

        </div>


        {/* MOBILE BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden"
          aria-label="Open navigation"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (
        <div
          className={`
            border-t
            p-6
            md:hidden
            ${
              transparent
                ? "border-white/10 bg-cyan-950 text-white"
                : "border-slate-200 bg-white"
            }
          `}
        >

          <div className="
            flex
            flex-col
            gap-5
          ">

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Home
            </Link>

            <a
              href="/#features"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Features
            </a>


            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}


export default Navbar;