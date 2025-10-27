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
import {
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

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

  // Generate 30 days of trend data for charts (deterministic-ish)
  const trendData = useMemo(() => {
    const days = 30;
    const now = new Date();
    const base = {
      inventory: 1200,
      quotations: 40,
      purchaseOrders: 10,
      dispatches: 5,
    };

    return Array.from({ length: days }).map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (days - 1 - i));
      const date = d.toISOString().slice(0, 10);

      // simple deterministic variation using index
      return {
        date,
        inventory: Math.round(
          base.inventory + Math.sin(i / 3) * 50 + (i % 5) * 3
        ),
        quotations: Math.max(
          0,
          Math.round(base.quotations + Math.cos(i / 4) * 6 + (i % 3))
        ),
        purchaseOrders: Math.max(
          0,
          Math.round(base.purchaseOrders + Math.sin(i / 5) * 3)
        ),
        dispatches: Math.max(
          0,
          Math.round(base.dispatches + Math.cos(i / 6) * 2)
        ),
      };
    });
  }, []);

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
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="inventory"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
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
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="quotations"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
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
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="purchaseOrders"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
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
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="dispatches"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">View Dispatch</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Main trends chart */}
      <div className="mt-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>30-day Trends</CardTitle>
            <CardDescription>
              Inventory, Quotations, Purchase Orders, Dispatches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                inventory: { label: "Inventory", color: "var(--chart-2)" },
                quotations: { label: "Quotations", color: "var(--chart-1)" },
                purchaseOrders: { label: "POs", color: "#7c3aed" },
                dispatches: { label: "Dispatches", color: "#059669" },
              }}
              className="h-[320px] w-full"
            >
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="inventory"
                  stroke="var(--color-inventory)"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="quotations"
                  stroke="var(--color-quotations)"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="purchaseOrders"
                  stroke="var(--color-purchaseOrders)"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="dispatches"
                  stroke="var(--color-dispatches)"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
