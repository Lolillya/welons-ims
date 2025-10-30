import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { ItemsModal } from "./_components/all-items-modal";
import { useState } from "react";

const QuotationsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleViewAllItems = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && <ItemsModal closeModal={handleViewAllItems} />}
      <section className="main-container">
        <div className="flex justify-between">
          <div className="relative items-center flex w-[36%] z-auto">
            <Search className="absolute ml-3" />
            <Input placeholder="Search" className="pl-10 py-5 rounded-full" />
          </div>

          <Button>Create New Quotation</Button>
        </div>

        <div className="flex flex-col gap-5 flex-1">
          <Tabs>
            <TabsList className="bg-foreground rounded-full gap-2 py-6 px-1">
              <TabsTrigger className="rounded-full p-5" value="approved">
                Approved Quotations
              </TabsTrigger>
              <TabsTrigger className="rounded-full p-5" value="pending">
                Pending Quotations
              </TabsTrigger>
              <TabsTrigger className="rounded-full p-5" value="rejected">
                Rejected Quotations
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-5 h-full">
            <div className="flex flex-col w-full gap-5 justify-between">
              {Array.from({ length: 10 }).map((_, i) => (
                <div className="bg-white p-4 rounded-full" key={i}>
                  <span>Quotation No. {i + 1}</span>
                  <span className="ml-10">Quotation Name {i + 1}</span>
                </div>
              ))}

              <div className="flex gap-5 items-center">
                <Pagination className=" justify-start">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <label className="w-full">showing 1 - 10 of #</label>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="w-full bg-white rounded-lg shadow-lg flex-1 p-10 flex flex-col justify-between">
                <div className="flex  justify-between">
                  <h3>Details</h3>
                  <div className="flex justify-between items-center gap-5">
                    <Button>Edit</Button>
                    <Button>Print</Button>
                  </div>
                </div>

                <Separator color="" />

                <div className="flex flex-col">
                  <h3>Quote Information</h3>
                  <div className="grid grid-cols-2 grid-rows-2">
                    <span>Quotation Name: </span>
                    <span>Quotation Number: </span>
                    <span>Date: </span>
                    <span>Vait Until: </span>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col">
                  <h3>Quote Contact</h3>
                  <div className="grid grid-rows-3 grid-cols-2">
                    <span>Attention To: </span>
                    <span>Phone: </span>
                    <span>Project Details: </span>
                    <span>Email: </span>
                    <span></span>
                    <span>Site Location: </span>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <h3>Purchasing Information</h3>
                    <Button onClick={handleViewAllItems}>View All</Button>
                  </div>
                  <div className="flex flex-col">
                    <Table className="text-primary">
                      <TableHeader>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>QTY.</TableCell>
                          <TableCell>Unit Cost</TableCell>
                          <TableCell>Total Amount</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>99</TableCell>
                          <TableCell>Set</TableCell>
                          <TableCell>99</TableCell>
                          <TableCell>P 0000.00</TableCell>
                          <TableCell>P 0000.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <h4>Other Works (Optional)</h4>
                    <Table className="text-primary">
                      <TableHeader>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>QTY.</TableCell>
                          <TableCell>Unit Cost</TableCell>
                          <TableCell>Total Amount</TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>99</TableCell>
                          <TableCell>Set</TableCell>
                          <TableCell>99</TableCell>
                          <TableCell>P 0000.00</TableCell>
                          <TableCell>P 0000.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <Separator />
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3>Total Other Works</h3>
                    <span>P 0000.00</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3>Overhead Contingency & Mobilization</h3>
                    <span>P 0000.00</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3>Delivery Fee</h3>
                    <span>P 0000.00</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3>Grand Total</h3>
                    <span>P 0000.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuotationsPage;
