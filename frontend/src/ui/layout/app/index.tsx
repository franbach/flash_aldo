import { Outlet } from "react-router-dom";
import Header from "@/ui/layout/app/header";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/app/redux/hooks";
import { get_app_warnings } from "@/pages/dashboard/redux/selectors";
import "react-toastify/dist/ReactToastify.css";

export const Layout: React.FC = () => {
  const hide_warnings = useAppSelector(get_app_warnings);

  return (
    <div className="relative flex flex-col m-4">
      <Header />
      <main className="my-2">
        <Outlet />
      </main>

      {!hide_warnings && <ToastContainer limit={5} />}
    </div>
  );
};
