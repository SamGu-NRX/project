'use client';

import { useState, useMemo } from 'react';
import { CertificateCard } from './CertificateCard';
import { CertificateListItem } from './CertificateListItem';
import { CertificateTable } from './CertificateTable';
import { CertificateModal } from './CertificateModal';
import ViewSwitcher from '@/components/filterSort/ViewSwitcher';
import FilterSortSection, {
  FilterOption,
  SortOption
} from '@/components/filterSort';

export interface Certificate {
  id: number;
  studentName: string;
  course: string;
  issueDate: string;
  expirationDate: string;
  status: 'active' | 'expired' | 'revoked';
  certificateUrl: string;
}

interface CertificatesClientProps {
  serverCertificates: Certificate[];
}

export default function CertificatesClient({
  serverCertificates
}: CertificatesClientProps) {
  const [certificates, setCertificates] =
    useState<Certificate[]>(serverCertificates);

  // Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] =
    useState<Certificate | null>(null);

  // Filters and Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('issueDate'); // default sort
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewType, setViewType] = useState<'card' | 'list' | 'table'>('card');

  const uniqueCourses = useMemo(() => {
    const allCourses = certificates.map((c) => c.course);
    return Array.from(new Set(allCourses));
  }, [certificates]);

  // Prepare Filter options
  const courseOptions: FilterOption[] = [
    { label: 'All Courses', value: 'select' },
    ...uniqueCourses.map((c) => ({ label: c, value: c }))
  ];
  const statusOptions: FilterOption[] = [
    { label: 'All Status', value: 'select' },
    { label: 'Active', value: 'active' },
    { label: 'Expired', value: 'expired' },
    { label: 'Revoked', value: 'revoked' }
  ];

  // Prepare Sort options
  const sortOptions: SortOption[] = [
    { label: 'Student Name', value: 'studentName' },
    { label: 'Course', value: 'course' },
    { label: 'Issue Date', value: 'issueDate' },
    { label: 'Expires', value: 'expirationDate' },
    { label: 'Status', value: 'status' }
  ];

  // Filter + Sort logic
  const filteredAndSortedCertificates = useMemo(() => {
    return certificates
      .filter(
        (cert) =>
          cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterCourse ? cert.course === filterCourse : true) &&
          (filterStatus ? cert.status === filterStatus : true)
      )
      .sort((a, b) => {
        const aVal = a[sortBy as keyof Certificate];
        const bVal = b[sortBy as keyof Certificate];
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [certificates, searchTerm, filterCourse, filterStatus, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Certificates</h2>
      </div>

      {/* Reusable Filter + Sort Section */}
      <FilterSortSection
        // Search
        searchLabel="Search"
        searchPlaceholder="Search certificates..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // We pass in two filters: "Course" and "Status"
        filters={[
          {
            id: 'filterCourse',
            label: 'Course',
            placeholder: 'All Courses',
            value: filterCourse,
            onValueChange: setFilterCourse,
            options: courseOptions
          },
          {
            id: 'filterStatus',
            label: 'Status',
            placeholder: 'All Status',
            value: filterStatus,
            onValueChange: setFilterStatus,
            options: statusOptions
          }
        ]}
        // Sorter
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={sortOptions}
      />

      {/* View Switcher: card/list/table */}
      <ViewSwitcher viewType={viewType} setViewType={setViewType} />

      {/* Render Items by View Type */}
      {viewType === 'card' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onViewDetails={() => {
                setCurrentCertificate(cert);
                setIsViewModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {viewType === 'list' && (
        <div className="space-y-4">
          {filteredAndSortedCertificates.map((cert) => (
            <CertificateListItem
              key={cert.id}
              certificate={cert}
              onViewDetails={() => {
                setCurrentCertificate(cert);
                setIsViewModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {viewType === 'table' && (
        <CertificateTable
          certificates={filteredAndSortedCertificates}
          onViewDetails={(cert) => {
            setCurrentCertificate(cert);
            setIsViewModalOpen(true);
          }}
        />
      )}

      {/* Modal for Certificate Details */}
      <CertificateModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        certificate={currentCertificate}
      />
    </div>
  );
}
