// app/teacher/certificates/components/CertificateCard.tsx
"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { Certificate } from "./types";

interface CertificateCardProps {
  certificate: Certificate;
  onViewDetails: () => void;
}

export const CertificateCard: FC<CertificateCardProps> = ({
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              {certificate.studentName}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              Course: {certificate.course}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Issued: {certificate.issueDate}
            </p>
            <p className="text-sm text-gray-500">
              Expires: {certificate.expirationDate}
            </p>
          </div>
          <Award className={`h-8 w-8 ${statusColor}`} />
        </div>

        <Button variant="outline" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
      </Card>
    </motion.div>
  );
};
