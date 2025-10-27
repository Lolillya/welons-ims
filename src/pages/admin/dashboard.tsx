import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Dashboard = () => {
  const stats = useMemo(
    () => ({
      inventory: 1240,
      quotations: 56,
      purchaseOrders: 12,
      dispatches: 9,
    }),
    []
  );

  return (
    <section className="main-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Overview of items in stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{stats.inventory}</div>
              <div className="text-sm ">Total SKUs</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>View Inventory</Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Quotations</CardTitle>
            <CardDescription>Recent quotation entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{stats.quotations}</div>
              <div className="text-sm ">Pending / Total</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Quotations</Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>Orders awaiting processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{stats.purchaseOrders}</div>
              <div className="text-sm ">Open orders</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Open Orders</Button>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dispatch</CardTitle>
            <CardDescription>Recently dispatched shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{stats.dispatches}</div>
              <div className="text-sm ">Dispatches today</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">View Dispatch</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
