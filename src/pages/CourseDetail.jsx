import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Rocket, CheckCircle2, Award, BookOpen, Code2, MessageCircle } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { base44 } from '@/api/base44Client';
import { COURSES, whatsappLink } from '@/lib/constants';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const local = COURSES.find((c) => c.slug === slug);
    if (local) {
      setCourse(local);
      setLoading(false);
      return;
    }
    base44.entities.Course.filter({ slug, status: 'Published' })
      .then((data) => { if (data && data.length > 0) setCourse(data[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20">
        <p className="text-lg font-semibold text-foreground">Course not found</p>
        <Link to="/courses" className="btn-primary"><ArrowLeft className="h-4 w-4" /> Back to Courses</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12">
        <GradientBackground />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> All Courses
          </Link>
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">{course.level || 'Beginner'}</span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{course.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{course.short_description}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2.5">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">{course.duration}</span>
                </div>
                <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2.5">
                  <span className="text-sm font-semibold">Fee: <span className="gradient-text-blue">PKR {(course.fee || 0).toLocaleString()}</span></span>
                </div>
                <div className="glass-card flex items-center gap-2 rounded-xl px-4 py-2.5">
                  <Award className="h-5 w-5 text-success" />
                  <span className="text-sm font-semibold">Certificate Included</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/register?course=${course.slug || course.id}`} className="btn-primary"><Rocket className="h-4 w-4" /> Enroll Now</Link>
                <a href={whatsappLink(`I want to enroll in ${course.title}`)} target="_blank" rel="noopener noreferrer" className="btn-secondary"><MessageCircle className="h-4 w-4" /> Ask Question</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
              <img src={course.thumbnail} alt={course.title} className="w-full rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="pb-20 lg:pb-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {/* What you'll learn */}
              {course.learning_outcomes && course.learning_outcomes.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 sm:p-8">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><BookOpen className="h-5 w-5 text-primary" /> What You'll Learn</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {course.learning_outcomes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /><span className="text-sm text-foreground">{item}</span></div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Curriculum */}
              {course.curriculum && course.curriculum.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 sm:p-8">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Code2 className="h-5 w-5 text-primary" /> Course Curriculum</h2>
                  <div className="mt-4 space-y-2">
                    {course.curriculum.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 rounded-xl border border-border bg-white p-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">{i + 1}</span>
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Description */}
              {course.full_description && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-foreground">Course Overview</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{course.full_description}</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card-strong sticky top-24 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground">Course Details</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Duration</span><span className="font-semibold">{course.duration}</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Level</span><span className="font-semibold">{course.level || 'Beginner'}</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Certificate</span><span className="font-semibold text-success">Included</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Format</span><span className="font-semibold">Live Online</span></div>
                  {course.instructor && <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Instructor</span><span className="font-semibold">{course.instructor}</span></div>}
                </div>
                <div className="mt-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 p-4 text-center">
                  <span className="text-xs text-muted-foreground">Course Fee</span>
                  <div className="text-3xl font-extrabold gradient-text-blue">PKR {(course.fee || 0).toLocaleString()}</div>
                </div>
                <Link to={`/register?course=${course.slug || course.id}`} className="btn-primary mt-4 w-full"><Rocket className="h-4 w-4" /> Enroll Now</Link>
                <a href={whatsappLink(`I want to know more about ${course.title}`)} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-2 w-full"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}