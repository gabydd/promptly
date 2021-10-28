import Link from "next/link";

type Props = {
  name: string;
  link: string;
};

const NavLink = ({ name, link }: Props) => {
  return (
    <div className="self-center">
      <Link href={link}>
        <button className="bg-green-400 mx-3 w-20 rounded-sm">{name}</button>
      </Link>
    </div>
  );
};

export default NavLink;
