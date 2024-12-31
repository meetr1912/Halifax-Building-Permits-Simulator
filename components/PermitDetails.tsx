"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Calculator } from "lucide-react";

interface PermitDetailsProps {
  selectedProjects: string[];
}

const permitInfo: Record<string, {
  documents: string[];
  fees: string;
  inspections: string[];
}> = {
  "Single-unit dwelling": {
    documents: [
      "Site plan",
      "Architectural drawings",
      "Structural drawings",
      "Energy efficiency compliance forms",
      "Property survey",
      "Lot grading plan",
    ],
    fees: "Based on construction value (minimum $750)",
    inspections: [
      "Foundation",
      "Pre-backfill",
      "Framing",
      "Insulation",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Final inspection",
    ],
  },
  "Triplex": {
    documents: [
      "Site plan",
      "Architectural drawings",
      "Structural drawings",
      "Energy efficiency compliance forms",
      "Property survey",
      "Lot grading plan",
      "Parking plan",
      "Landscaping plan",
    ],
    fees: "Based on construction value (minimum $1,500)",
    inspections: [
      "Foundation",
      "Pre-backfill",
      "Framing",
      "Insulation",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Fire separation",
      "Final inspection",
    ],
  },
  "Townhouse": {
    documents: [
      "Site plan",
      "Architectural drawings",
      "Structural drawings",
      "Energy efficiency compliance forms",
      "Property survey",
      "Lot grading plan",
      "Parking plan",
      "Landscaping plan",
      "Party wall details",
    ],
    fees: "Based on construction value (minimum $1,200)",
    inspections: [
      "Foundation",
      "Pre-backfill",
      "Framing",
      "Insulation",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Fire separation",
      "Final inspection",
    ],
  },
  "Structural changes": {
    documents: [
      "Existing floor plans",
      "Proposed floor plans",
      "Structural drawings",
      "Engineer's report (if required)",
    ],
    fees: "Based on construction value (minimum $250)",
    inspections: [
      "Pre-construction review",
      "Framing",
      "Final inspection",
    ],
  },
  "Plumbing/Electrical changes": {
    documents: [
      "Existing floor plans",
      "Proposed floor plans",
      "Electrical/plumbing schematics",
      "Contractor's license information",
    ],
    fees: "Based on number of fixtures/outlets (minimum $150)",
    inspections: [
      "Rough-in inspection",
      "Final inspection",
    ],
  },
  "Adding a secondary suite": {
    documents: [
      "Existing floor plans",
      "Proposed floor plans",
      "Fire separation details",
      "Egress window details",
      "Parking plan",
    ],
    fees: "Based on construction value (minimum $500)",
    inspections: [
      "Framing",
      "Insulation",
      "Fire separation",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Final inspection",
    ],
  },
  "Deck construction": {
    documents: [
      "Site plan showing deck location",
      "Construction drawings",
      "Property survey",
    ],
    fees: "Based on construction value (minimum $85)",
    inspections: ["Foundation", "Framing", "Final inspection"],
  },
  "Fence installation": {
    documents: ["Site plan showing fence location", "Property survey"],
    fees: "Flat fee of $50",
    inspections: ["Final inspection"],
  },
  "Swimming pool installation": {
    documents: [
      "Site plan showing pool location",
      "Property survey",
      "Fence/enclosure details",
      "Grading plan",
    ],
    fees: "Based on construction value (minimum $200)",
    inspections: [
      "Pre-construction site review",
      "Pool fence/enclosure",
      "Final inspection",
    ],
  },
  "Accessory structure": {
    documents: [
      "Site plan showing structure location",
      "Construction drawings",
      "Property survey",
    ],
    fees: "Based on construction value (minimum $100)",
    inspections: [
      "Foundation (if applicable)",
      "Framing",
      "Final inspection",
    ],
  },
};

export default function PermitDetails({ selectedProjects }: PermitDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Permit Details</h2>
      <Accordion type="single" collapsible className="w-full">
        {selectedProjects.map((project) => (
          <AccordionItem key={project} value={project}>
            <AccordionTrigger className="text-lg font-semibold">
              {project}
            </AccordionTrigger>
            <AccordionContent>
              {permitInfo[project] ? (
                <div className="space-y-6 p-4">
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold mb-2">
                      <FileText className="w-5 h-5" />
                      Required Documents
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {permitInfo[project].documents.map((doc) => (
                        <li key={doc}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold mb-2">
                      <Calculator className="w-5 h-5" />
                      Permit Fees
                    </h3>
                    <p>{permitInfo[project].fees}</p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 font-semibold mb-2">
                      <Calendar className="w-5 h-5" />
                      Required Inspections
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {permitInfo[project].inspections.map((inspection) => (
                        <li key={inspection}>{inspection}</li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full mt-4">
                    Apply for Permit
                  </Button>
                </div>
              ) : (
                <p className="text-gray-600">
                  Permit information not available for this project type.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 