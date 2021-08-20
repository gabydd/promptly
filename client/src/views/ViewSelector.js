import { useState } from "react";

const ViewSelector = ({ date, setDate }) => {
  const [value, setValue] = useState(
    `${date.getFullYear()}-${
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth + 1
    }-${date.getDate() < 9 ? "0" + (date.getDate() + 1) : date.getDate() + 1}`
  );
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    setDate(
      new Date(value.slice(0, 4), value.slice(5, 7) - 1, value.slice(8, 10))
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
