export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// Возвращает кол-во дней в месяце
export const getDaysInMonth = (monthIndex: number) => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return daysInMonth[monthIndex];
};

// Получение индекса по названию
export const getMonthIndex = (monthName: string) => months.indexOf(monthName);

// Генерирует верное кол-во дней
export const generateDays = (monthIndex: number) => {
  const daysInMonth = getDaysInMonth(monthIndex);
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};
