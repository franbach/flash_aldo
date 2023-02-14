import { useNavigation } from "react-router-dom";
import IconThunder from "../../../../public/thunder-icon.svg"
import IconAldoStore from "../../../../public/aldo-icon.svg"

import LinkTo from "@/ui/buttons/LinkTo";

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <div className="flex space-x-3 p-3 bg-gray-100 rounded-lg items-center">
      <div className="flex space-x-2">
        <img className="h-8 w-6" src={IconThunder} alt="" />
        <img className="h-8" src={IconAldoStore} alt="" />
      </div>
      <LinkTo path="/" title="Home" />
      <LinkTo path="/dashboard" title="Dashboard" />
      {navigation.state === "loading" && <p className="bg-green-200 text-green-500 px-2 rounded">Loading...</p>}
    </div>
  );
};

export default Header;
