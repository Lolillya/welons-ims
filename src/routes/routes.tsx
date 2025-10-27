import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/default-layout";
import MainLayout from "../layouts/main-layout";
import Dashboard from "../pages/admin/dashboard";
import QuotationsPage from "../pages/admin/quotations";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: "login",
        element: <></>,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "admin/",
        children: [
          {
            path: "dashboard/",
            element: <Dashboard />,
          },
          {
            path: "quotation/",
            element: <QuotationsPage />,
          },
        ],
      },
    ],
  },
]);
