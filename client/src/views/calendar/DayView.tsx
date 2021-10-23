type DayProps = {
  day: number
}

const DayCell = ({ day }: DayProps) => {
  return (
    <div className="border border-collapse border-solid border-gray-900 h-36">
      <div>{day}</div>
    </div>
  );
};

export default DayCell;

