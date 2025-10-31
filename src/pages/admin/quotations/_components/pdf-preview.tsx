import Logo from "@/assets/welons-logo.jpg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { usePDF } from "react-to-pdf";

export const PDFPreview = () => {
  const { toPDF, targetRef } = usePDF({
    filename: "quotation.pdf",
    page: { margin: 5 },
  });

  const handlePrintToPDF = () => {
    toPDF();
  };
  return (
    <section className="absolute h-screen w-screen bg-black/50 flex items-center justify-center z-10">
      <div className="bg-background flex flex-col w-1/2 h-[80%] p-10 gap-5">
        <div className="flex items-center justify-between">
          <Button onClick={handlePrintToPDF}>Print to PDF</Button>
          <X className="text-primary" />
        </div>
        <label>Preview</label>
        <div className="w-full h-full bg-white rounded-lg flex flex-col overflow-y-scroll gap-5">
          <div ref={targetRef} className="flex flex-col gap-5 bg-white">
            <div className=" flex items-center gap-16 justify-center">
              <img src={Logo} width={80} />
              <div className="flex flex-col text-center">
                <h4>WELONS PHILIPPINES CORP.</h4>
                <span className="text-xs">
                  SYS HUB, WAREHOUSE H, GARNET ST., RGA VILLAGE, CABAGUIO AVE.,
                  DAVAO CITY, PHILIPPINES
                </span>
                <span className="text-xs">0917 324 0903 | 0997 169 0758</span>
                <span className="text-xs">
                  prefab@welons.com | rio@welonsgroup.com
                </span>
              </div>
              <div></div>
            </div>
            <Separator />

            <div className="px-10">
              <div className="flex justify-between">
                <div className="flex-col flex">
                  <span className="text-sm">Attention To: </span>
                  <span className="text-sm">Contact Number: </span>
                  <span className="text-sm">Email Address: </span>
                  <span className="text-sm">Site Location: </span>
                </div>

                <div className="flex flex-col">
                  <h3>QUOTATION</h3>
                  <div className="flex-col flex">
                    <span className="text-sm">Date: </span>
                    <span className="text-sm">Valid Until: </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-5">
                <span className="text-sm">Project Details: </span>
                <textarea rows={3} className="border border-black w-[70%]" />
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f1c232]">
                    <TableHead className="text-primary border-r border-black"></TableHead>
                    <TableHead className="text-primary border-r border-black">
                      ITEMS
                    </TableHead>
                    <TableHead className="text-primary border-r border-black">
                      DESCRIPTION
                    </TableHead>
                    <TableHead className="text-primary border-r border-black">
                      Qty.
                    </TableHead>
                    <TableHead className="text-primary border-r border-black">
                      UNIT
                    </TableHead>
                    <TableHead className="text-primary border-r border-black">
                      UNIT COST
                    </TableHead>
                    <TableHead className="text-primary">AMOUNT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="align-top border-r border-black border-b">
                      1
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      PREFAB CONTAINER WHITE
                    </TableCell>
                    <TableCell className="flex flex-col align-top border-r border-black border-b">
                      <span>• 20ft White Prefab Unit</span>
                      <span>
                        • Unit Size: 18 sqm floor area 5.95(L)*3(W)*2.8(H) m
                      </span>
                      <span>
                        • Main Frames (Galvanized Profile) 2.3mm thickness
                      </span>
                      <span>• Wall (Polystyrene Insulation)</span>
                      <span>
                        • Floor (Fire Proof Magnesium Board - Gray Black) 18mm
                        thickness
                      </span>
                      <span>• 1 Pc. Door (Steel Frame) 925*2040 mm</span>
                      <span>
                        • 2 pcs. Windows (Plastic Steel Sliding Windows )
                        920*1200 mm
                      </span>
                      <span>
                        • Ceiling (Steel Tile) 2785(L)*980(W)*0.23(T) mm
                      </span>
                      <span>
                        • Roof (Steel Tile with 40mm Glass wool)
                        2950(L)*980(W)*0.45(T) mm
                      </span>
                      <span>
                        • Basic Electrical (2 lights, 2 sockets, 1, switch, 1
                        distribution box)
                      </span>
                      <span>• Including Installation</span>
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      6
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      unnit
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      P 139,999.00
                    </TableCell>
                    <TableCell className="align-top border-b border-black">
                      P 839,994.00
                    </TableCell>
                  </TableRow>

                  <TableRow className="bg-[#efefef]">
                    <TableCell
                      colSpan={6}
                      className="text-right border-r border-black"
                    >
                      TOTAL MATERIALS
                    </TableCell>
                    <TableCell>P 1,884,490.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f1c232]">
                    <TableHead className="text-primary"></TableHead>
                    <TableHead className="text-primary">
                      OTHER WORKS (OPTIONAL)
                    </TableHead>
                    <TableHead className="text-primary">DESCRIPTION</TableHead>
                    <TableHead className="text-primary">Qty.</TableHead>
                    <TableHead className="text-primary">UNIT</TableHead>
                    <TableHead className="text-primary">UNIT COST</TableHead>
                    <TableHead className="text-primary">AMOUNT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="">
                    <TableCell className="align-top border-r border-black border-b">
                      1
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      PREFAB CONTAINER WHITE
                    </TableCell>
                    <TableCell className="flex flex-col align-top border-r border-black border-b">
                      <span>• 20ft White Prefab Unit</span>
                      <span>
                        • Unit Size: 18 sqm floor area 5.95(L)*3(W)*2.8(H) m
                      </span>
                      <span>
                        • Main Frames (Galvanized Profile) 2.3mm thickness
                      </span>
                      <span>• Wall (Polystyrene Insulation)</span>
                      <span>
                        • Floor (Fire Proof Magnesium Board - Gray Black) 18mm
                        thickness
                      </span>
                      <span>• 1 Pc. Door (Steel Frame) 925*2040 mm</span>
                      <span>
                        • 2 pcs. Windows (Plastic Steel Sliding Windows )
                        920*1200 mm
                      </span>
                      <span>
                        • Ceiling (Steel Tile) 2785(L)*980(W)*0.23(T) mm
                      </span>
                      <span>
                        • Roof (Steel Tile with 40mm Glass wool)
                        2950(L)*980(W)*0.45(T) mm
                      </span>
                      <span>
                        • Basic Electrical (2 lights, 2 sockets, 1, switch, 1
                        distribution box)
                      </span>
                      <span>• Including Installation</span>
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      6
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      unnit
                    </TableCell>
                    <TableCell className="align-top border-r border-black border-b">
                      P 139,999.00
                    </TableCell>
                    <TableCell className="align-top border-black border-b">
                      P 839,994.00
                    </TableCell>
                  </TableRow>

                  <TableRow className="bg-[#efefef]">
                    <TableCell
                      colSpan={6}
                      className="text-right border-r border-black border-b"
                    >
                      TOTAL OTHER WORKS
                    </TableCell>
                    <TableCell className="border-b border-black">
                      P 795,000.00
                    </TableCell>
                  </TableRow>

                  <TableRow className="bg-[#efefef]">
                    <TableCell
                      colSpan={6}
                      className="text-right border-r border-black border-b"
                    >
                      OVERHEAD CONTINGENCY & MOBILIZATION (Site inspection and
                      pull outs)
                    </TableCell>
                    <TableCell className="border-b border-black">
                      P 24,000.00
                    </TableCell>
                  </TableRow>

                  <TableRow className="bg-[#ffff00]">
                    <TableCell
                      colSpan={6}
                      className="text-right border-r border-black"
                    >
                      DELIVERY FEE
                    </TableCell>
                    <TableCell>P 40,000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col">
              <h6 className="font-bold text-destructive">
                GENERAL TERMS AND CONDITIONS:{" "}
              </h6>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3">
                  <span className="text-sm">1.)</span>
                  <span className="text-sm">
                    Quotation Validity: This quotation is valid for 15 days from
                    the date of issue. Prices and terms are subject to change
                    without prior notice. Prices are VAT exclusive unless
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">2.)</span>
                  <span className="text-sm">Payment Terms:</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">3.)</span>
                  <span className="text-sm">Payment Information:</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">4.)</span>
                  <span className="text-sm">
                    Late Payment Fee: For projects under progress billing terms,
                    payments must be made according to the agreed schedule. A
                    late payment fee of 2% per month shall be
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">5.)</span>
                  <span className="text-sm">Delivery Lead Time:</span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">6.)</span>
                  <span className="text-sm">
                    Pick-Up and Handling Disclaimer: If the unit is for pick-up,
                    Welons Philippines Corp. shall not be held liable for any
                    damage that may occur during transit or upon unloading,
                    especially if the assigned installer is not accompanying the
                    vehicle. Proper handling and securing of the unit shall be
                    the responsibility of the client or their authorized
                    representative.
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">7.)</span>
                  <span className="text-sm">
                    Client-Caused Delay: Client-caused delays, including failure
                    to provide timely decisions or information, inadequate
                    access or cooperation, delays in client-managed tasks that
                    result in workers being idle, and other related factors,
                    shall be subject to liquidated damages calculated based on
                    the number of hours/days the workers remain idle. The cost
                    of idle time will be determined based on the workers' daily
                    wages and applicable labor rates.
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">8.)</span>
                  <div className="flex flex-col">
                    <span className="text-sm">
                      Storage Charges: The client must adhere to the delivery
                      timeframe stipulated in Term 4. Storage charges will begin
                      to accrue five (5) days after the delivery lead time
                      stated in Term 4. In cases where the client requests a
                      delay in the delivery of materials beyond the stipulated
                      timeframe, a storage charge of Php 200.00 per unit per day
                      will be charged.
                    </span>

                    <span className="text-sm">
                      Storage Charges: The client must adhere to the delivery
                      timeframe stipulated in Term 4. Storage charges will begin
                      to accrue five (5) days after the delivery lead time
                      stated in Term 4. In cases where the client requests a
                      delay in the delivery of materials beyond the stipulated
                      timeframe, a storage charge of Php 200.00 per unit per day
                      will be charged
                    </span>

                    <span>
                      Units will not be dispatched if there is any outstanding
                      balance, including storage charges. The release of
                      materials will only proceed once all due amounts,
                      including the storage fees, have been fully paid.
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">9.)</span>
                  <span className="text-sm">
                    Cancellation and Modifications: Orders for custom-sized
                    prefab containers are final and cannot be canceled nor
                    modified once the client has approved the quotation, the
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">10.)</span>
                  <span className="text-sm">
                    Warranty: Prefab materials are not covered under warranty
                    once the Project Completion and Acceptance Certificate has
                    been signed by the client. The acceptance
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">11.)</span>
                  <span className="text-sm">
                    Water Leak Disclaimer: Due to the unit's design and limited
                    gutter capacity, installation of a secondary roofing system
                    is strongly recommended. If the client opts not to
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">12.)</span>
                  <span className="text-sm">
                    Force Majeure: Welons Philippines Corp. shall not be liable
                    for any failure to perform its obligations under this
                    contract due to events beyond its reasonable control,
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">13.)</span>
                  <span className="text-sm">
                    Exclusions: Civil works, plumbing, painting/repainting of
                    scratches, extra roofing, customizations, furnitures,
                    appliances, landscaping, decorations, interior design,
                    building
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">14.)</span>
                  <span className="text-sm">
                    Client Responsibilities: The client is responsible for
                    providing power and water to the site where the work will be
                    carried out.
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-sm">15.)</span>
                  <span className="text-sm">
                    Acceptance: By approving this quotation, the client agrees
                    to the terms and conditions herein. Upon approval, this
                    quotation will serve as a binding contract between the
                  </span>
                </div>
              </div>
            </div>

            <Separator />
            <span className="text-center text-sm">
              We hope this proposal merit your approval and fully contain all
              the requirements necessary for your complete evaluation and
              favorable acceptance. If you have any clarifications or concerns,
              please feel free to connect with us.
            </span>

            <div className="px-10 flex justify-between text-sm">
              <div className="flex flex-col w-3/12 gap-8">
                <span>Prepared by:</span>

                <div className="flex flex-col items-center justify-between">
                  <span className="mb-3">John Doe</span>
                  <Separator />
                  <span className="text-xs">Operations Manager</span>
                </div>
              </div>

              <div className="flex flex-col w-3/12 gap-8">
                <span>Conforme:</span>

                <div className="flex flex-col items-center justify-between">
                  <span className="mb-3">John Doe</span>
                  <Separator />
                  <span className="text-xs">
                    Signature over printed name/date
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <span className="text-center">
              A GOOD ENVIRONMENT COMES FROM GOOD MATERIALS
            </span>

            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};
