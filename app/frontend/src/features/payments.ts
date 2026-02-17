import { entities } from "_/go/models";

export const getNearestPayout = (bonds: entities.Bond[], monthIndex: number, currentDay: number) => {
  const bnds = bonds
    .filter((b) => b.Months.split(",").map(Number).includes(monthIndex))
    .filter((b) => b.Day > currentDay);

  if (bnds.length > 0) return bnds[0].Day;

  return 0;
};
