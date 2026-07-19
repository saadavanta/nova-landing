import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Clock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const CHART_COLORS = ['hsl(221 83% 53%)', 'hsl(262 83% 58%)', 'hsl(199 89% 60%)', 'hsl(160 84% 39%)', 'hsl(38 92% 50%)'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, revenue: 0, courses: 0 });
  const [courseData, setCourseData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [enrollments, courses] = await Promise.all([
        base44.entities.Enrollment.list('-created_date', 200),
        base44.entities.Course.list('-created_date', 50),
      ]);

      const total = enrollments.length;
      const pending = enrollments.filter(e => e.enrollment_status === 'Payment Under Review' || e.enrollment_status === 'Payment Pending').length;
      const approved = enrollments.filter(e => e.enrollment_status === 'Approved').length;
      const revenue = enrollments.filter(e => e.enrollment_status === 'Approved').reduce((sum, e) => sum + (e.course_fee || 0), 0);

      setStats({ total, pending, approved, revenue, courses: courses.filter(c => c.status === 'Published').length });

      // Course distribution
      const courseMap = {};
      enrollments.forEach(e => {
        const c = e.selected_course || 'Unknown';
        courseMap[c] = (courseMap[c] || 0) + 1;
      });
      setCourseData(Object.entries(courseMap).map(([name, value]) => ({ name: name.length > 20 ? name.substring(0, 20) + '...' : name, value })));

      // Status distribution
      const statusMap = {};
      enrollments.forEach(e => {
        const s = e.enrollment_status || 'Unknown';
        statusMap[s] = (statusMap[s] || 0) + 1;
      });
      setStatusData(Object.entries(statusMap).map(([name, value]) => ({ name, value })));

      setRecent(enrollments.slice(0, 5));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Enrollments', value: stats.total, icon: Users, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Approvals', value: stats.pending, icon: Clock, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Approved Students', value: stats.approved, icon: CheckCircle2, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
    { label: 'Total Revenue', value: `Rs ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50' },
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-2xl font-extrabold text-foreground">{card.value}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color}`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Enrollments by Course</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(214 32% 91%)' }} />
              <Bar dataKey="value" fill="hsl(221 83% 53%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Enrollment Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="text-base font-bold text-foreground">Recent Enrollments</h3>
          <Link to="/admin/enrollments" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Student</th>
                <th className="px-5 py-3 font-semibold">Course</th>
                <th className="px-5 py-3 font-semibold">Fee</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recent.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground">{enrollment.full_name}</p>
                    <p className="text-xs text-muted-foreground">{enrollment.email}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{enrollment.selected_course}</td>
                  <td className="px-5 py-3 font-medium">Rs {enrollment.course_fee?.toLocaleString() || '-'}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={enrollment.enrollment_status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{new Date(enrollment.created_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}