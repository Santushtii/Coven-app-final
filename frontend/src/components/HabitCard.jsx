function HabitCard({
  habit,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-white p-5 shadow-lg">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-700">
            {habit.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-black">
            {habit.name}
          </h3>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(habit)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            title="Edit habit"
          >
            ✎
          </button>

          <button
            onClick={() => onDelete(habit._id)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-950 hover:text-red-300"
            title="Delete habit"
          >
            🗑
          </button>

        </div>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <div>
          <p className="text-xs text-slate-500">
            Current streak
          </p>

          <p className="mt-1 text-2xl font-bold text-black">
            {habit.streak || 0}
            <span className="ml-1 text-sm font-normal text-slate-500">
              days
            </span>
          </p>
        </div>

        <button
          onClick={() => onToggle(habit._id)}
          className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
            habit.completedToday
              ? "bg-green-950 text-white hover:bg-slate-700"
              : "bg-cyan-700 text-white hover:bg-cyan-900"
          }`}
        >
          {habit.completedToday ? "✓ Done" : "Check"}
        </button>

      </div>

    </div>
  );
}

export default HabitCard;