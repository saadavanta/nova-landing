import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock, CreditCard, Rocket, ArrowRight, GraduationCap, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user?.email]);

  const fetchData = async () => {
    if (!user?.email) return;
    try {
      const [enrollments, courses] = await Promise.all([
        base44.entities.Enrollment.list('-created_date', 200),
        base44.entities.Course.list('-created_date', 50),
      ]);

      // Find this student's enrollment by matching email
      const myEnrollment = enrollments.find((e) => e.email === user.email) || null;
      setEnrollment(myEnrollment);

      // Find the matching course by title
      if (myEnrollment?.selected_course) {
        const myCourse = courses.find((c) => c.title === myEnrollment.selected_course) || null;
        setCourse(myCourse);
      }
    } catch (err) {
      console.error('Student dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // No enrollment yet — show empty state
  if (!enrollment) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-foreground">Welcome, {user?.full_name?.split(' ')[0] || 'Student'}!</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          You haven't enrolled in a course yet. Browse our courses and start your coding journey today.
        </p>
        <Link to="/courses" className="btn-primary mt-6">
          <Rocket className="h-4 w-4" /> Browse Courses
        </Link>
      </div>
    );
  }

  const statCards = [
    { label: 'Enrolled Course', value: enrollment.selected_course || '—', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'Enrollment Status', value: enrollment.enrollment_status || '—', icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
    { label: 'Payment Status', value: enrollment.payment_status || '—', icon: Clock, color: 'from-amber-500 to-orange-500' },
    { label: 'Course Fee', value: `Rs ${enrollment.course_fee?.toLocaleString() || '—'}`, icon: CreditCard, color: 'from-purple-500 to-violet-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-sm"
      >
        <h2 className="text-2xl font-extrabold text-foreground">Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}! 👋</h2>
        <p className="mt-1 text-muted-foreground">Here's an overview of your enrollment and course progress.</p>
        {enrollment.registration_id && (
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <GraduationCap className="h-3.5 w-3.5" /> Registration ID: {enrollment.registration_id}
          </span>
        )}
      </motion.div>

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
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <p className="mt-2 truncate text-lg font-bold text-foreground" title={String(card.value)}>{card.value}</p>
              </div>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.color}`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Enrolled Course */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">My Enrolled Course</h3>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          {course ? (
            <div className="flex flex-col gap-4 sm:flex-row">
              {course.thumbnail && (
                <img src={course.thumbnail} alt={course.title} className="h-40 w-full rounded-xl object-cover sm:w-56" />
              )}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-foreground">{course.title}</h4>
                {course.short_description && <p className="mt-1 text-sm text-muted-foreground">{course.short_description}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.duration && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                  )}
                  {course.level && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                      <Rocket className="h-3 w-3" /> {course.level}
                    </span>
                  )}
                  {course.instructor && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                      <User className="h-3 w-3" /> {course.instructor}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Course details are not available right now. Please check back later.</p>
          )}

          {/* Curriculum */}
          {course?.curriculum?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Course Curriculum</h4>
              <ul className="mt-3 space-y-2">
                {course.curriculum.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Learning Outcomes */}
          {course?.learning_outcomes?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">What You'll Learn</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {course.learning_outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar — Payment + Profile */}
        <div className="space-y-6">
          {/* Payment Status */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-foreground">Payment Details</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Course Fee</span>
                <span className="font-semibold">Rs {enrollment.course_fee?.toLocaleString() || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold">{enrollment.payment_method || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-semibold">{enrollment.transaction_id || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Date</span>
                <span className="font-semibold">{enrollment.payment_date || '—'}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <StatusBadge status={enrollment.payment_status} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Profile */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">My Details</h3>
              <Link to="/student/profile" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all">
                Edit <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <ProfileLine icon={User} label="Name" value={user?.full_name} />
              <ProfileLine icon={Mail} label="Email" value={user?.email} />
              <ProfileLine icon={Phone} label="Mobile" value={enrollment.mobile_number} />
              <ProfileLine icon={MapPin} label="City" value={enrollment.city} />
              <ProfileLine icon={Calendar} label="Joined" value={enrollment.created_date ? new Date(enrollment.created_date).toLocaleDateString() : null} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Approved': 'bg-green-100 text-green-700',
    'Under Review': 'bg-amber-100 text-amber-700',
    'Pending': 'bg-orange-100 text-orange-700',
    'Rejected': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status || '—'}
    </span>
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
