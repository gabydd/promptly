import { SetStateAction, useState } from "react";
import { ViewSelectorType } from "../lib/types";

const ViewSelector = ({ date, setDate }: ViewSelectorType) => {
  const [value, setValue] = useState(
    `${date.getFullYear()}-${
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }-${date.getDate() < 9 ? "0" + (date.getDate() + 1) : date.getDate() + 1}`
  );
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    setDate(
      new Date(  Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, Number(value.slice(8, 10)))
    );
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={value} onChange={handleChange} />
        <button type="submit">GO</button>
      </form>
    </div>
  );
};

export default ViewSelector;
