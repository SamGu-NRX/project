// app/teacher/certificates/components/CertificateTable.tsx
"use client";

import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { Certificate } from "./types";

interface CertificateTableProps {
  certificates: Certificate[];
  onViewDetails: (certificate: Certificate) => void;
}

export const CertificateTable: FC<CertificateTableProps> = ({
  certificates,
  onViewDetails,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Issue Date</TableHead>
          <TableHead>Expiration Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates.map((certificate) => {
          const statusColor =
            certificate.status === "active"
              ? "text-green-500"
              : certificate.status === "expired"
              ? "text-yellow-500"
              : "text-red-500";

          return (
            <TableRow key={certificate.id}>
              <TableCell>{certificate.studentName}</TableCell>
              <TableCell>{certificate.course}</TableCell>
              <TableCell>{certificate.issueDate}</TableCell>
              <TableCell>{certificate.expirationDate}</TableCell>
              <TableCell>
                <Award className={`h-5 w-5 inline mr-2 ${statusColor}`} />
                {certificate.status.charAt(0).toUpperCase() +
                  certificate.status.slice(1)}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(certificate)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
