// import { Table } from "@/components/ui/table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EllipsisVertical, Pencil, Search, Trash, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const QuotationsPage = () => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop");

  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  // sample rows for the table (stable across renders)
  const sampleRows = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i + 1,
        item: `Item ${i + 1}`,
        specs: `Specs ${i + 1}`,
        color: ["Red", "Blue", "Green", "Yellow"][i % 4],
        inExcess: i % 2 === 0 ? "No" : "Yes",
        srp: (100 + i * 5).toFixed(2),
      })),
    []
  );

  return (
    <section className="main-container">
      {/* <div>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <h1>Quotations</h1>
              <Tabs>
                <TabsList>
                  <TabsTrigger value="3months">Last 3 months</TabsTrigger>
                  <TabsTrigger value="30days">Last 30 days</TabsTrigger>
                  <TabsTrigger value="7days">Last 7 days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div> */}
      <div className="flex gap-5 items-center">
        <Tabs>
          <TabsList className="bg-sidebar-primary py-6">
            <TabsTrigger value="pending-quotations" className="text-lg p-5">
              Pending Quitations
            </TabsTrigger>
            <TabsTrigger value="approves-quotations" className="text-lg p-5">
              Approved Quitations
            </TabsTrigger>
            <TabsTrigger value="rejected-quotations" className="text-lg p-5">
              Rejected Quitations
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative items-center flex">
          <Search className="absolute ml-3" />
          <Input className="pl-10 py-6" placeholder="search" />
        </div>
      </div>
      <div className="h-full overflow-y-hidden">
        <div className="rounded-lg h-full flex flex-col justify-between">
          {/* <Table className="overflow-y-hidden flex flex-col">
            <TableHeader className="bg-[#DEE2E6]">
              <TableRow>
                <TableHead>
                  <div className="flex gap-1 items-center font-bold">
                    <Checkbox className="bg-white" />
                    <span>Items</span>
                  </div>
                </TableHead>
                <TableHead className="font-bold">Specs</TableHead>
                <TableHead className="font-bold">Color</TableHead>
                <TableHead className="font-bold">In Excess</TableHead>
                <TableHead className="font-bold">SRP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-scroll">
              {sampleRows.map((row) => (
                <TableRow key={row.id} className="w-full">
                  <TableCell>
                    <div className="flex gap-1 items-center">
                      <Checkbox className="bg-white" />
                      <span>{row.item}</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.specs}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.inExcess}</TableCell>
                  <TableCell className="flex items-center w-full justify-between">
                    <span>₱{row.srp}</span>
                    <Popover>
                      <PopoverTrigger>
                        <div className="p-2 hover:bg-[#DEE2E6] rounded-lg transition-all duration-100">
                          <EllipsisVertical />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-30">
                        <ul>
                          <li className="text-sm hover:bg-gray-100 duration-100">
                            <Pencil size={18} />
                            <span>Edit</span>
                          </li>
                          <li className="text-sm hover:bg-gray-100 text-red-500 transition-all duration-100">
                            <Trash2 size={18} />
                            <span>Delete</span>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <div className="w-full rounded-lg flex flex-col overflow-y-hidden">
            <div className="w-full flex justify-between p-3 bg-gray-300 rounded-t-lg">
              <div className="flex items-center gap-2 w-full">
                <Checkbox className="bg-white" />
                <span>Items</span>
              </div>
              <span className="w-full">Specs</span>
              <span className="w-full">Color</span>
              <span className="w-full">In Excess</span>
              <div className="flex items-center justify-between w-full">
                <span>SRP</span>
                <Popover>
                  <PopoverTrigger>
                    <div className="px-2 hover:bg-gray-300 rounded-lg transition-all duration-100">
                      <EllipsisVertical />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-30">
                    <ul>
                      <li className="text-sm hover:bg-gray-100 duration-100">
                        <Pencil size={18} />
                        <span>Edit</span>
                      </li>
                      <li className="text-sm hover:bg-gray-100 text-red-500 transition-all duration-100">
                        <Trash2 size={18} />
                        <span>Delete</span>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="w-full overflow-y-scroll flex flex-col">
              {sampleRows.map((row) => (
                <div className="w-full flex justify-between p-3 items-center">
                  <div className="flex items-center gap-2 w-full">
                    <Checkbox className="bg-white" />
                    <span>{row.item}</span>
                  </div>
                  <span className="w-full">{row.specs}</span>
                  <span className="w-full">{row.color}</span>
                  <span className="w-full">{row.inExcess}</span>
                  <div className="flex items-center justify-between w-full">
                    <span>₱{row.srp}</span>
                    <Popover>
                      <PopoverTrigger>
                        <div className="p-2 hover:bg-gray-300 rounded-lg transition-all duration-100">
                          <EllipsisVertical />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-30">
                        <ul>
                          <li className="text-sm hover:bg-gray-100 duration-100">
                            <Pencil size={18} />
                            <span>Edit</span>
                          </li>
                          <li className="text-sm hover:bg-gray-100 text-red-500 transition-all duration-100">
                            <Trash2 size={18} />
                            <span>Delete</span>
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <label>0 of # row(s) selected.</label>
            <Pagination className="w-fit m-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotationsPage;
