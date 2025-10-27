import {
  LayoutDashboard,
  ListOrdered,
  NotebookTabs,
  SquareKanban,
  Truck,
  Warehouse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { links } from "@/routes/route-links";

export const Sidebar = () => {
  const navigate = useNavigate();

  const SidebarItems = [
    {
      key: "dashboard",
      link: links.DASHBOARD,
      icon: <LayoutDashboard />,
    },
    {
      key: "quotations",
      link: links.QUOTATIONS,
      icon: <NotebookTabs />,
    },
    {
      key: "inventory",
      link: links.INVENTORY,
      icon: <Warehouse />,
    },
    {
      key: "purchase_order",
      link: links.PURCHASE_ORDERS,
      icon: <ListOrdered />,
    },
    {
      key: "projects",
      link: links.PROJECTS,
      icon: <SquareKanban />,
    },
    {
      key: "dispatch",
      link: links.DISPATCH,
      icon: <Truck />,
    },
  ] as const;

  return (
    <section className="sidebar">
      <aside>
        <div>
          <h1>Welons</h1>
        </div>

        <div className="flex flex-col sidebar-text">
          {/* <label>Invenetory</label> */}
          <ul>
            {SidebarItems.map((s, i) => (
              <li onClick={() => navigate(s.link)}>
                {s.icon}
                <span>{s.key}</span>
              </li>
            ))}
            {/* <li>
              <LayoutDashboard />
              <span>Dashboard</span>
            </li>
            <li>
              <NotebookTabs />
              <span>Quotations</span>
            </li>
            <li>
              <Warehouse />
              <span>Inventory</span>
            </li>
            <li>
              <ListOrdered />
              <span>Purchase Orders</span>
            </li>
            <li>
              <SquareKanban />
              <span>Projects</span>
            </li>
            <li>
              <Truck />
              <span>Dispatch</span>
            </li> */}
          </ul>
        </div>
      </aside>
    </section>
  );
};
