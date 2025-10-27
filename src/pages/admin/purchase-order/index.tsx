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

type PO = {
  id: number;
  poNumber: string;
  project: string;
  status: "in-progress" | "complete" | "draft";
  total: number;
  createdAt: string;
};

const PurchaseOrderPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const rows: PO[] = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => {
        const statuses: PO["status"][] = ["in-progress", "complete", "draft"];
        const status = statuses[i % statuses.length];
        const date = new Date();
        date.setDate(date.getDate() - (i % 30));
        return {
          id: i + 1,
          poNumber: `PO-${2000 + i}`,
          project: `Project ${(i % 6) + 1}`,
          status,
          total: Math.round(500 + Math.random() * 5000),
          createdAt: date.toISOString().slice(0, 10),
        };
      }),
    []
  );

  const filtered = useMemo(() => {
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.poNumber.toLowerCase().includes(q) ||
        r.project.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const totalProjects = filtered.length;
  const inProgress = filtered.filter((r) => r.status === "in-progress").length;
  const complete = filtered.filter((r) => r.status === "complete").length;

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="main-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
            <CardDescription>All purchase orders / projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">Export</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In-Progress</CardTitle>
            <CardDescription>Currently active POs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complete</CardTitle>
            <CardDescription>Finished orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complete}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="search-po" className="text-sm font-medium">
              Search
            </label>
            <Input
              id="search-po"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search PO number or project"
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
              <TableHead>PO Number</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.poNumber}</TableCell>
                <TableCell>{r.project}</TableCell>
                <TableCell
                  className={
                    r.status === "complete"
                      ? "text-green-600"
                      : r.status === "in-progress"
                      ? "text-amber-600"
                      : "text-muted"
                  }
                >
                  {r.status}
                </TableCell>
                <TableCell>₱{r.total.toLocaleString()}</TableCell>
                <TableCell>{r.createdAt}</TableCell>
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

export default PurchaseOrderPage;
