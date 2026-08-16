import { Heart } from "lucide-react";


function Footer() {
  return (
    <footer className="
      border-t
      border-slate-200
      bg-white
    ">

      <div className="
        mx-auto
        flex
        max-w-7xl
        flex-col
        gap-4
        px-6
        py-8
        text-sm
        text-slate-500
        md:flex-row
        md:items-center
        md:justify-between
        lg:px-8
      ">

        <div>
          <span className="
            font-serif
            text-xl
            font-semibold
            italic
            text-slate-900
          ">
            Coven
          </span>
        </div>


        <a
          href="https://icons8.com"
          target="_blank"
          rel="noreferrer"
          className="
            transition
            hover:text-cyan-700
          "
        >
          Icons by Icons8
        </a>


        <div className="
          flex
          items-center
          gap-1
        ">
          Made with React and Tailwind CSS
        </div>

      </div>

    </footer>
  );
}


export default Footer;