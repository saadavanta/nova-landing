import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Calendar, CreditCard, BookOpen, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import toast from 'react-hot-toast';

export default function StudentProfile() {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState(null);
  const [form, setForm] = useState({ mobile_number: '', whatsapp_number: '', city: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEnrollment();
  }, [user?.email]);

  const fetchEnrollment = async () => {
    if (!user?.email) return;
    try {
      const enrollments = await base44.entities.Enrollment.list('-created_date', 200);
      const mine = enrollments.find((e) => e.email === user.email) || null;
      setEnrollment(mine);
      if (mine) {
        setForm({
          mobile_number: mine.mobile_number || '',
          whatsapp_number: mine.whatsapp_number || '',
          city: mine.city || '',
        });
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!enrollment?.id) return;
    setSaving(true);
    try {
      await base44.entities.Enrollment.update(enrollment.id, {
        mobile_number: form.mobile_number,
        whatsapp_number: form.whatsapp_number,
        city: form.city,
      });
      setEnrollment({ ...enrollment, ...form });
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error(err?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <p className="text-muted-foreground">No profile found. Please enroll in a course first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white">
            {user?.full_name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-foreground">{user?.full_name || 'Student'}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editable details */}
        <form onSubmit={handleSave} className="lg:col-span-2 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-foreground">Editable Details</h3>
          <p className="mt-1 text-sm text-muted-foreground">Update your contact information below.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">Mobile Number</label>
              <input
                type="tel"
                value={form.mobile_number}
                onChange={(e) => setForm({ ...form, mobile_number: e.target.value })}
                placeholder="+92 3XX XXXXXXX"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">WhatsApp Number</label>
              <input
                type="tel"
                value={form.whatsapp_number}
                onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
                placeholder="+92 3XX XXXXXXX"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-foreground">City</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Karachi"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary mt-6 inline-flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {/* Read-only details */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-foreground">Account Info</h3>
          <div className="mt-4 space-y-3 text-sm">
            <ProfileLine icon={User} label="Full Name" value={enrollment.full_name} />
            <ProfileLine icon={Mail} label="Email" value={enrollment.email} />
            <ProfileLine icon={GraduationCap} label="Education" value={enrollment.education_level} />
            <ProfileLine icon={BookOpen} label="Enrolled Course" value={enrollment.selected_course} />
            <ProfileLine icon={CreditCard} label="Payment Method" value={enrollment.payment_method} />
            <ProfileLine icon={Calendar} label="Joined" value={enrollment.created_date ? new Date(enrollment.created_date).toLocaleDateString() : null} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileLine({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value || '—'}</p>
      </div>
    </div>
  );
}
