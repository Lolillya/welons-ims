import { X } from "lucide-react";
import { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface ItemsModalProps {
  closeModal: () => void;
}

type Row = {
  item: string;
  description?: string;
  qty: number;
  unit: string;
  unitCost: number;
};

const formatCurrency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

export const ItemsModal = ({ closeModal }: ItemsModalProps) => {
  const items: Row[] = useMemo(
    () => [
      {
        item: "ITEM-001",
        description: "Widget A",
        qty: 10,
        unit: "pcs",
        unitCost: 150,
      },
      {
        item: "ITEM-002",
        description: "Widget B",
        qty: 5,
        unit: "pcs",
        unitCost: 350,
      },
      {
        item: "ITEM-003",
        description: "Widget C",
        qty: 2,
        unit: "sets",
        unitCost: 1250,
      },
    ],
    []
  );

  const otherWorks: Row[] = useMemo(
    () => [
      {
        item: "OW-001",
        description: "Installation",
        qty: 1,
        unit: "job",
        unitCost: 2000,
      },
      {
        item: "OW-002",
        description: "Testing",
        qty: 1,
        unit: "job",
        unitCost: 750,
      },
    ],
    []
  );

  const itemsTotal = items.reduce((s, r) => s + r.qty * r.unitCost, 0);
  const otherTotal = otherWorks.reduce((s, r) => s + r.qty * r.unitCost, 0);

  // default overhead/contingency & mobilization percentage (example 10%)
  const overhead = Math.round((itemsTotal + otherTotal) * 0.1 * 100) / 100;
  const deliveryFee = 0;
  const grandTotal =
    Math.round((itemsTotal + otherTotal + overhead + deliveryFee) * 100) / 100;

  return (
    <section className="absolute bg-black/50 w-screen h-screen flex justify-center items-center z-50">
      <div className="bg-background w-[70%] h-11/12 flex flex-col rounded-lg p-6 overflow-auto">
        <X
          className="self-end text-primary cursor-pointer"
          onClick={closeModal}
        />

        <h3 className="text-lg font-semibold mb-4">Items</h3>

        <div className="mb-6 overflow-x-auto">
          <Table className="w-full table-auto text-sm">
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="p-2 text-primary text-left">
                  Items
                </TableHead>
                <TableHead className="p-2 text-primary text-left">
                  Description
                </TableHead>
                <TableHead className="p-2 text-primary text-right">
                  QTY.
                </TableHead>
                <TableHead className="p-2 text-primary text-left">
                  Unit
                </TableHead>
                <TableHead className="p-2 text-primary text-right">
                  Unit Cost
                </TableHead>
                <TableHead className="p-2 text-primary text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((r, idx) => {
                const amt = r.qty * r.unitCost;
                return (
                  <TableRow key={idx} className="even:bg-white odd:bg-slate-50">
                    <TableCell className="p-2">{r.item}</TableCell>
                    <TableCell className="p-2">{r.description}</TableCell>
                    <TableCell className="p-2 text-right">{r.qty}</TableCell>
                    <TableCell className="p-2">{r.unit}</TableCell>
                    <TableCell className="p-2 text-right">
                      {formatCurrency(r.unitCost)}
                    </TableCell>
                    <TableCell className="p-2 text-right">
                      {formatCurrency(amt)}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow className="font-semibold">
                <TableCell colSpan={5} className="p-2 text-right">
                  Total Items
                </TableCell>
                <TableCell className="p-2 text-right">
                  {formatCurrency(itemsTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h3 className="text-lg font-semibold mb-4">Other works (optional)</h3>

        <div className="mb-6 overflow-x-auto">
          <Table className="w-full table-auto text-sm">
            <TableHeader>
              <TableRow className="bg-slate-100 text-primary">
                <TableHead className="p-2 text-primary text-left">
                  Other works (optional)
                </TableHead>
                <TableHead className="p-2 text-primary text-left">
                  Description
                </TableHead>
                <TableHead className="p-2 text-primary text-right">
                  QTY
                </TableHead>
                <TableHead className="p-2 text-primary text-left">
                  Unit
                </TableHead>
                <TableHead className="p-2 text-primary text-right">
                  Unit Cost
                </TableHead>
                <TableHead className="p-2 text-primary text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {otherWorks.map((r, idx) => {
                const amt = r.qty * r.unitCost;
                return (
                  <TableRow key={idx} className="even:bg-white odd:bg-slate-50">
                    <TableCell className="p-2">{r.item}</TableCell>
                    <TableCell className="p-2">{r.description}</TableCell>
                    <TableCell className="p-2 text-right">{r.qty}</TableCell>
                    <TableCell className="p-2">{r.unit}</TableCell>
                    <TableCell className="p-2 text-right">
                      {formatCurrency(r.unitCost)}
                    </TableCell>
                    <TableCell className="p-2 text-right">
                      {formatCurrency(amt)}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow className="font-semibold">
                <TableCell colSpan={5} className="p-2 text-right">
                  Total Other Works
                </TableCell>
                <TableCell className="p-2 text-right">
                  {formatCurrency(otherTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-auto border-t pt-4">
          <div className="flex justify-between py-1">
            <span>TOTAL OTHER WORKS</span>
            <span className="font-semibold">{formatCurrency(otherTotal)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span>OVERHEAD CONTINGENCY &amp; MOBILIZATION (10%)</span>
            <span className="font-semibold">{formatCurrency(overhead)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span>DELIVERY FEE</span>
            <span className="font-semibold">{formatCurrency(deliveryFee)}</span>
          </div>

          <div className="flex justify-between py-3 text-lg font-bold border-t mt-3">
            <span>GRAND TOTAL</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
