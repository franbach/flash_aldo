import { Outlet } from "react-router-dom";
import Header from "@/ui/layout/app/header";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col m-4">
      <Header />
      <main className="my-2">
        <Outlet />
      </main>
    </div>
  );
};
