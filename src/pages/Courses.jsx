import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Rocket, CheckCircle2, Search, Loader2 } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { base44 } from '@/api/base44Client';
import { COURSES } from '@/lib/constants';

export default function Courses() {
  const [courses, setCourses] = useState(COURSES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    base44.entities.Course.filter({ status: 'Published' }, 'display_order', 50)
      .then((data) => { if (data && data.length > 0) setCourses(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.short_description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <GradientBackground />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">Our Courses</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find the Perfect <span className="gradient-text">Course for You</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore our industry-relevant courses designed to take you from beginner to job-ready. Live classes, real projects, and certificates included.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-xl border border-border bg-white/80 py-3 pl-11 pr-4 text-sm outline-none backdrop-blur-md transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.slug || course.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">{course.level || 'Beginner'}</span>
                      <span className="flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold backdrop-blur"><Clock className="h-3 w-3" /> {course.duration}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.short_description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Fee</span>
                        <div className="text-xl font-extrabold gradient-text-blue">PKR {(course.fee || 0).toLocaleString()}</div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link to={`/courses/${course.slug || course.id}`} className="flex-1 btn-secondary !py-2 text-sm">Learn More <ArrowRight className="h-4 w-4" /></Link>
                      <Link to={`/register?course=${course.slug || course.id}`} className="flex-1 btn-primary !py-2 text-sm"><Rocket className="h-4 w-4" /> Enroll</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}