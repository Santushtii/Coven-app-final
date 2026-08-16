import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <div className="text-center">

        <p className="text-7xl font-bold text-indigo-500">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-white">
          Page not found
        </h1>

        <p className="mt-2 text-slate-400">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
        >
          Back to Coven
        </Link>

      </div>

    </div>
  );
}

export default NotFound;