export default function WeekDays() {
  return (
    <>
      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
        <div key={day} className="text-center text-xs text-gray-500 py-1">
          {day}
        </div>
      ))}
    </>
  );
}
