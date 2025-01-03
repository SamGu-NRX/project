"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  isSubmitting?: boolean;
}

export function FileUpload({
  onFileSelect,
  maxSize = 10,
  acceptedTypes = [".pdf", ".doc", ".docx"],
  isSubmitting = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type
    const fileType = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!acceptedTypes.includes(fileType)) {
      setError(`File type must be: ${acceptedTypes.join(", ")}`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        simulateUpload();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        simulateUpload();
      }
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card
      className={`relative p-6 ${
        dragActive
          ? "border-2 border-dashed border-primary"
          : "border border-border"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        accept={acceptedTypes.join(",")}
        onChange={handleChange}
        id="file-upload"
      />

      {selectedFile ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <File className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{selectedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedFile(null)}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {uploadProgress === 100 ? "Upload complete" : "Uploading..."}
          </p>
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="flex cursor-pointer flex-col items-center gap-4"
        >
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium">
              Drop your file here, or{" "}
              <span className="text-primary">browse</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Supports: {acceptedTypes.join(", ")} (Max {maxSize}MB)
            </p>
          </div>
        </label>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive">
          Error: {error}
        </p>
      )}
    </Card>
  );
}