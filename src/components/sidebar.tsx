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
      key: "purchase order",
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
          <ul>
            {SidebarItems.map((s) => (
              <li onClick={() => navigate(s.link)} key={s.key}>
                {s.icon}
                <span>{s.key}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
};
