import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../lib/context";
import NavLink from "../components/NavLink";

const Home = () => {
  const value = useUser();
  const { push } = useRouter();
  useEffect(() => {
    if (!value?.user) {
      push("/auth");
    }
  }, [value, push]);
  const logOut = () => {
    document.cookie = "token=; expires=0";
    value?.refetchUser();
  };
  return (
    <div>
      <div className="flex flex-row h-10 bg-gray-800">
      <NavLink link="/" name="Home" />
        <NavLink link="/calendar" name="Calendar" />
        <NavLink link="/tasks" name="Tasks" />
        <NavLink link="/events" name="Events" />
        <NavLink link="/projects" name="Projects" />
        <NavLink link="/user" name="Profile" />
        <div className="self-center mx-auto">
          <button
            onClick={logOut}
            className="bg-green-400 mx-3 w-20 rounded-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
