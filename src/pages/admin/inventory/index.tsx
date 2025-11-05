import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type InventoryRow = {
  id: number;
  sku: string;
  name: string;
  stock: number;
  reorderLevel: number;
};

import { fetchMaterials, type Material } from "@/core/inventory/materialsApi";
import { fetchPrefabs } from "@/core/inventory/prefabsApi";

const InventoryPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [materials, setMaterials] = useState<InventoryRow[]>([]);
  const [prefabs, setPrefabs] = useState<InventoryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchMaterials()
      .then((data: Material[]) => {
        if (!mounted) return;
        console.log("Fetched materials:", data);
        const mapped: InventoryRow[] = data.map((m) => ({
          id: m.id,
          sku: m.sku || `unit-${m.id}`,
          name: m.name || "",
          stock: typeof m.stock === "number" ? m.stock : 0,
          reorderLevel:
            typeof m.reorderLevel === "number"
              ? m.reorderLevel
              : typeof m.reorder_level === "number"
              ? (m as any).reorder_level
              : 0,
        }));
        setMaterials(mapped);
      })
      .catch((err: any) => {
        if (!mounted) return;
        setError(err?.message ?? String(err));
        console.error("Fetch error:", err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    // fetch prefabs in parallel and map into InventoryRow shape for now
    fetchPrefabs()
      .then((data: any[]) => {
        if (!mounted) return;
        console.log("Fetched prefabs:", data);
        const mapped = data.map((p) => ({
          id: p.id,
          sku: p.name ? String(p.name) : `prefab-${p.id}`,
          name: p.name || "",
          stock:
            typeof p.available_quantity === "number" ? p.available_quantity : 0,
          reorderLevel: 0,
        }));
        setPrefabs(mapped);
      })
      .catch((err: any) => {
        if (!mounted) return;
        console.error("Fetch prefabs error:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return materials;
    const q = query.toLowerCase();
    return materials.filter(
      (r) => r.sku.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }, [materials, query]);

  const totalItems = filtered.length;
  const inStock = filtered.filter((r) => r.stock > r.reorderLevel).length;
  const lowStock = filtered.filter(
    (r) => r.stock > 0 && r.stock <= r.reorderLevel
  ).length;
  const outOfStock = filtered.filter((r) => r.stock === 0).length;

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="main-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">Export</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStock}</div>
          </CardContent>
          <CardFooter />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lowStock}</div>
          </CardContent>
          <CardFooter />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
          </CardContent>
          <CardFooter />
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-5">
          <Tabs>
            <TabsList>
              <TabsTrigger value="prefabs">Prefabs</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-3">
            <div>
              <Input
                id="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search product"
              />
            </div>
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

      {/* <div className="rounded-lg shadow bg-sidebar-primary">
        <Table className="rounded-lg">
          <TableHeader className="bg-[#DEE2E6]">
            <TableRow>
              <TableHead>Units</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading materials...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>Error: {error}</TableCell>
              </TableRow>
            ) : pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No materials found.</TableCell>
              </TableRow>
            ) : (
              pageRows.map((r) => {
                const status =
                  r.stock === 0
                    ? "Out of stock"
                    : r.stock <= r.reorderLevel
                    ? "Low stock"
                    : "In stock";
                return (
                  <TableRow key={r.id}>
                    <TableCell>{r.sku}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.stock}</TableCell>
                    <TableCell>{r.reorderLevel}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })
            )}
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
      </div> */}
    </section>
  );
};

export default InventoryPage;
