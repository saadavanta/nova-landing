import { useState, useEffect } from 'react';
import { Search, CheckCircle2, XCircle, Eye, Download } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await base44.entities.Enrollment.list('-created_date', 200);
      setEnrollments(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = enrollments;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.full_name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q) || e.registration_id?.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') {
      result = result.filter(e => e.enrollment_status === statusFilter);
    }
    setFiltered(result);
  }, [search, statusFilter, enrollments]);

  const updateStatus = async (id, status, paymentStatus) => {
    try {
      await base44.entities.Enrollment.update(id, { enrollment_status: status, payment_status: paymentStatus });
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, enrollment_status: status, payment_status: paymentStatus } : e));
      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or registration ID..." className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-52"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Payment Under Review">Payment Under Review</SelectItem>
            <SelectItem value="Payment Pending">Payment Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Student</th>
                <th className="px-5 py-3 font-semibold">Course</th>
                <th className="px-5 py-3 font-semibold">Payment Method</th>
                <th className="px-5 py-3 font-semibold">Fee</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground">{enrollment.full_name}</p>
                    <p className="text-xs text-muted-foreground">{enrollment.email}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground max-w-[180px] truncate">{enrollment.selected_course}</td>
                  <td className="px-5 py-3 text-muted-foreground">{enrollment.payment_method || '-'}</td>
                  <td className="px-5 py-3 font-medium">Rs {enrollment.course_fee?.toLocaleString() || '-'}</td>
                  <td className="px-5 py-3"><StatusBadge status={enrollment.enrollment_status} /></td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{new Date(enrollment.created_date).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setSelected(enrollment)} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      {enrollment.enrollment_status !== 'Approved' && (
                        <button onClick={() => updateStatus(enrollment.id, 'Approved', 'Approved')} className="rounded-lg p-2 text-muted-foreground hover:bg-green-100 hover:text-green-600" title="Approve">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      )}
                      {enrollment.enrollment_status !== 'Rejected' && (
                        <button onClick={() => updateStatus(enrollment.id, 'Rejected', 'Rejected')} className="rounded-lg p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600" title="Reject">
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No enrollments found.</p>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Enrollment Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                {/* Status Banner */}
                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Registration ID</p>
                    <p className="font-bold text-foreground">{selected.registration_id || 'N/A'}</p>
                  </div>
                  <StatusBadge status={selected.enrollment_status} />
                </div>

                {/* Student Info */}
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Full Name" value={selected.full_name} />
                  <DetailItem label="Email" value={selected.email} />
                  <DetailItem label="Mobile" value={selected.mobile_number} />
                  <DetailItem label="WhatsApp" value={selected.whatsapp_number} />
                  <DetailItem label="City" value={selected.city} />
                  <DetailItem label="Gender" value={selected.gender} />
                  <DetailItem label="Date of Birth" value={selected.date_of_birth} />
                  <DetailItem label="Education Level" value={selected.education_level} />
                </div>

                {/* Course Info */}
                <div className="rounded-xl border border-border p-4">
                  <h4 className="mb-3 text-sm font-bold text-foreground">Course & Payment</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem label="Selected Course" value={selected.selected_course} />
                    <DetailItem label="Course Fee" value={`Rs ${selected.course_fee?.toLocaleString()}`} />
                    <DetailItem label="Duration" value={selected.course_duration} />
                    <DetailItem label="Payment Method" value={selected.payment_method} />
                    <DetailItem label="Transaction ID" value={selected.transaction_id} />
                    <DetailItem label="Sender Mobile" value={selected.sender_mobile} />
                    <DetailItem label="Payment Date" value={selected.payment_date} />
                  </div>
                  {selected.payment_notes && <DetailItem label="Payment Notes" value={selected.payment_notes} />}
                </div>

                {/* Payment Screenshot */}
                {selected.payment_screenshot && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">Payment Screenshot</p>
                    <a href={selected.payment_screenshot} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img src={selected.payment_screenshot} alt="Payment proof" className="max-h-48 rounded-xl border border-border object-cover" />
                    </a>
                    <a href={selected.payment_screenshot} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      <Download className="h-4 w-4" /> Open full image
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 border-t border-border pt-4">
                  {selected.enrollment_status !== 'Approved' ? (
                    <Button onClick={() => updateStatus(selected.id, 'Approved', 'Approved')} className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4" /> Approve Enrollment
                    </Button>
                  ) : (
                    <Button onClick={() => updateStatus(selected.id, 'Suspended', 'Pending')} variant="outline" className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50">
                      Suspend
                    </Button>
                  )}
                  {selected.enrollment_status !== 'Rejected' && (
                    <Button onClick={() => updateStatus(selected.id, 'Rejected', 'Rejected')} variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-foreground">{value || '—'}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Approved': 'bg-green-100 text-green-700',
    'Payment Under Review': 'bg-amber-100 text-amber-700',
    'Payment Pending': 'bg-orange-100 text-orange-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Suspended': 'bg-red-100 text-red-700',
    'Inactive': 'bg-gray-100 text-gray-700',
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
}