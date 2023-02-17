import { useNavigation } from "react-router-dom";
import IconThunder from "@/assets/thunder-icon.svg";
import IconAldoStore from "@/assets/aldo-icon.svg";
import MoonLoader from "react-spinners/MoonLoader";

import LinkTo from "@/ui/buttons/LinkTo";

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <div className="flex p-3 bg-gray-100 rounded-lg items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex space-x-2">
          <img className="h-8 w-6" src={IconThunder} alt="" />
          <img className="h-8" src={IconAldoStore} alt="" />
        </div>
        <LinkTo path="/" title="Home" />
        <LinkTo path="/dashboard" title="Dashboard" />
      </div>
      <div className="flex">
        <MoonLoader
          color={"#000"}
          loading={navigation.state === "loading"}
          size={24}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Header;
