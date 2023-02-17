import { Link, useLocation } from "react-router-dom";

interface FCProps {
  path: string;
  title: string;
}

const LinkTo: React.FC<FCProps> = ({ title, path }) => {
  const location = useLocation();

  return (
    <Link
      to={path}
      className={`${
        location.pathname === path ? "bg-black text-white" : "bg-gray-50 hover:bg-black hover:text-white"
      } font-semibold text-black text-sm rounded p-2 transition-all duration-300`}
    >
      {title}
    </Link>
  );
};

export default LinkTo;
