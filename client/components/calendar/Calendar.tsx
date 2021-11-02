import DayView from "./Day";

type CalendarProps = {
  date: Date
}

const Calendar = ({ date }: CalendarProps) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = [
    31,
    new Date(year, 1, 29).getMonth() === 1 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month, daysInMonth[month]).getDay();
  const fillDays = (month: number) => {
    let topArray = [];
    let middleArray = [];
    let bottomArray = [];
    for (
      let day = daysInMonth[month - 1] - firstDay + 2;
      day < daysInMonth[month - 1] + 1;
      day++
    ) {
      topArray.push(day);
    }
    for (let day = 1; day < daysInMonth[month] + 1; day++) {
      middleArray.push(day);
    }
    for (let day = 1; day < 7 - lastDay + 1; day++) {
      bottomArray.push(day);
    }
    let dayArray = [...topArray, ...middleArray, ...bottomArray];
    return dayArray;
  };

  return (
    <div className="grid grid-cols-7 grid-rows-5">
      {fillDays(month).map((day, index) => {
        return <DayView key={index} day={day} />;
      })}
    </div>
  );
};

export default Calendar;

/*
date.months[month].weeks.map((week) => {
        return (
          <tr key={week}>
            {date.months[month].days
              .slice(week * 7, week * 7 + 7)
              .map((day) => {
                return (
                  <td key={day}>
                    <DayCell day={day} />
                  </td>
                );
              })}
*/
/* const fillMonthWeeks = (days) => {
  let weekArray = [];
  for (let week = 0; week < Math.ceil(days / 7); week++) {
    weekArray.push(week);
  }
  return weekArray;
}; */
