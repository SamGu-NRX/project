// app/teacher/certificates/components/CertificateListItem.tsx
"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Certificate } from "./types";

interface CertificateListItemProps {
  certificate: Certificate;
  onViewDetails: () => void;
}

export const CertificateListItem: FC<CertificateListItemProps> = ({
  certificate,
  onViewDetails,
}) => {
  const statusColor =
    certificate.status === "active"
      ? "text-green-500"
      : certificate.status === "expired"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <motion.div
      className="flex items-center justify-between p-4 border rounded-lg"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h3 className="font-semibold text-lg">{certificate.studentName}</h3>
        <p className="text-sm text-gray-500">
          Course: {certificate.course} | Issued: {certificate.issueDate} |
          Expires: {certificate.expirationDate}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Award className={`h-6 w-6 ${statusColor}`} />
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </motion.div>
  );
};
