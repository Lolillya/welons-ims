import {
  LayoutDashboard,
  ListOrdered,
  NotebookTabs,
  SquareKanban,
  StretchHorizontal,
  Truck,
  Warehouse,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <section className="sidebar">
      <aside>
        <div>
          <h1>Welons</h1>
        </div>

        <div className="flex flex-col sidebar-text">
          {/* <label>Invenetory</label> */}
          <ul>
            <li>
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
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
};
