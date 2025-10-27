import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/default-layout";
import MainLayout from "../layouts/main-layout";
import Dashboard from "../pages/admin/dashboard/dashboard";
import QuotationsPage from "../pages/admin/quotations";
import InventoryPage from "@/pages/admin/inventory";

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
          {
            path: "inventory/",
            element: <InventoryPage />,
          },
        ],
      },
    ],
  },
]);
