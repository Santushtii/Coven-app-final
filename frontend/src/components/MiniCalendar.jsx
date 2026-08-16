function MiniCalendar({ completedDates = [] }) {
  const today = new Date();

  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    days.push(date);
  }

  const isCompleted = (date) => {
    const dateString = date.toISOString().split("T")[0];

    return completedDates.includes(dateString);
  };

  return (
    <div className="mt-5 grid grid-cols-7 gap-2">

      {days.map((date) => {
        const completed = isCompleted(date);

        return (
          <div
            key={date.toISOString()}
            className="flex flex-col items-center gap-2"
          >

            <span className="text-xs text-slate-500">
              {date.toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </span>

            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                completed
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {date.getDate()}
            </div>

          </div>
        );
      })}

    </div>
  );
}

export default MiniCalendar;