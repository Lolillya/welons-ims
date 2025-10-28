import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

type Dispatch = {
  id: number;
  dispatchNo: string;
  orderRef: string;
  // lifecycle status
  status: "approved" | "pending" | "cancelled";
  // new fields
  dispatchMode: "booking" | "pickup";
  truckingService?: string;
  unitStatus: "onhand" | "preorder";
  // order-level status (dispatched / reserved)
  orderStatus: "dispatched" | "reserved";
  carrier?: string;
  date: string;
};

const DispatchPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const rows: Dispatch[] = useMemo(
    () =>
      Array.from({ length: 38 }).map((_, i) => {
        const statuses: Dispatch["status"][] = [
          "approved",
          "pending",
          "cancelled",
        ];
        const orderStatuses: Dispatch["orderStatus"][] = [
          "dispatched",
          "reserved",
        ];
        const dispatchModes: Dispatch["dispatchMode"][] = ["booking", "pickup"];
        const unitStatuses: Dispatch["unitStatus"][] = ["onhand", "preorder"];

        const status = statuses[i % statuses.length];
        const orderStatus = orderStatuses[i % orderStatuses.length];
        const dispatchMode = dispatchModes[i % dispatchModes.length];
        const unitStatus = unitStatuses[i % unitStatuses.length];

        const d = new Date();
        d.setDate(d.getDate() - (i % 30));
        return {
          id: i + 1,
          dispatchNo: `DISP-${3000 + i}`,
          orderRef: `ORD-${5000 + i}`,
          status,
          dispatchMode,
          truckingService:
            status === "approved" ? ["J&T", "LBC", "DHL"][i % 3] : undefined,
          unitStatus,
          orderStatus,
          carrier:
            status === "approved" ? ["J&T", "LBC", "DHL"][i % 3] : undefined,
          date: d.toISOString().slice(0, 10),
        };
      }),
    []
  );

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.dispatchNo.toLowerCase().includes(q) ||
        r.orderRef.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const total = filtered.length;
  const approved = filtered.filter((r) => r.status === "approved").length;
  const pending = filtered.filter((r) => r.status === "pending").length;
  const cancelled = filtered.filter((r) => r.status === "cancelled").length;

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="main-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Dispatches</CardTitle>
            <CardDescription>All dispatch records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">Export</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved</CardTitle>
            <CardDescription>Approved dispatches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
            <CardDescription>Awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cancelled</CardTitle>
            <CardDescription>Cancelled dispatches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cancelled}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="search-dispatch" className="text-sm font-medium">
              Search
            </label>
            <Input
              id="search-dispatch"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search dispatch or order ref"
            />
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              setQuery("");
              setPage(1);
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="rounded-lg shadow bg-sidebar-primary">
        <Table className="rounded-lg">
          <TableHeader className="bg-[#DEE2E6]">
            <TableRow>
              <TableHead>Dispatch No</TableHead>
              <TableHead>Quotation No.</TableHead>
              <TableHead>Dispatch Mode</TableHead>
              <TableHead>Trucking Service</TableHead>
              <TableHead>Unit Status</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.dispatchNo}</TableCell>
                <TableCell>{r.orderRef}</TableCell>
                <TableCell className="capitalize">{r.dispatchMode}</TableCell>
                <TableCell>{r.truckingService || "-"}</TableCell>
                <TableCell className="capitalize">{r.unitStatus}</TableCell>
                <TableCell
                  className={
                    r.orderStatus === "dispatched"
                      ? "text-green-600"
                      : "text-amber-600"
                  }
                >
                  {r.orderStatus}
                </TableCell>
                <TableCell>{r.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex w-full justify-between items-center p-3">
          <div>
            <span className="text-sm">
              Showing {(page - 1) * pageSize + 1} -{" "}
              {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </span>
          </div>
          <Pagination className="w-fit m-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      setPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPage((p) => Math.min(pageCount, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default DispatchPage;
