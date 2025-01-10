// app/teacher/certificates/components/CertificateModal.tsx
"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Certificate } from "./types";

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate | null;
}

export const CertificateModal: FC<CertificateModalProps> = ({
  open,
  onOpenChange,
  certificate,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Certificate Details</DialogTitle>
        </DialogHeader>
        {certificate && (
          <div className="space-y-4">
            <div>
              <Label>Student Name</Label>
              <p>{certificate.studentName}</p>
            </div>
            <div>
              <Label>Course</Label>
              <p>{certificate.course}</p>
            </div>
            <div>
              <Label>Issue Date</Label>
              <p>{certificate.issueDate}</p>
            </div>
            <div>
              <Label>Expiration Date</Label>
              <p>{certificate.expirationDate}</p>
            </div>
            <div>
              <Label>Status</Label>
              <p>{certificate.status}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
