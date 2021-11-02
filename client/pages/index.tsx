import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../lib/context";
import NavLink from "../components/NavLink";
import Loading from "../components/Loading";
import Calendar from "../components/calendar/Calendar";
import DateSelector from "../components/calendar/DateSelector";

const Home = () => {
  const value = useUser();
  const { push } = useRouter();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (value && !value.user) {
      push("/auth");
    }
  }, [value, push]);
  const logOut = () => {
    document.cookie = "token=; expires=0";
    value?.refetchUser();
  };
  if (!value || value.loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="flex flex-row h-10 bg-gray-800">
        <NavLink link="/" name="Home" />
        <NavLink link="/calendar" name="Calendar" />
        <NavLink link="/tasks" name="Tasks" />
        <NavLink link="/events" name="Events" />
        <NavLink link="/projects" name="Projects" />
        <NavLink link="/user" name="Profile" />
        <div className="self-center ml-auto">
          <button
            onClick={logOut}
            className="bg-green-400 mx-3 w-20 rounded-sm"
          >
            Log Out
          </button>
        </div>
        <div className="self-center mr-3 rounded-sm bg-red-400">{value.user!.name}</div>
      </div>

      <DateSelector date={date} setDate={setDate} />
      <Calendar date={date} />
    </div>
  );
};

export default Home;
