import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

const MainLayout = () => {
  return (
    <>
      <main className="">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
