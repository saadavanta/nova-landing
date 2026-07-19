import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Rocket, CheckCircle2, Flame } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { COURSES } from '@/lib/constants';
import { base44 } from '@/api/base44Client';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState(COURSES);

  useEffect(() => {
    base44.entities.Course.filter({ status: 'Published' }, 'display_order')
      .then((data) => { if (data && data.length) setCourses(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Courses"
          title="Choose Your"
          highlight="Path to Success"
          subtitle="Industry-relevant courses designed to take you from beginner to job-ready. Every course includes live classes, real projects, and a certificate."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {course.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-bold text-white shadow-lg">
                    <Flame className="mr-1 inline h-3 w-3" />Popular
                  </span>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
                  Limited Seats
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    <Clock className="h-3 w-3" /> {course.duration}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.short_description}</p>

                {/* Curriculum chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.curriculum.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-md bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary">
                      {item}
                    </span>
                  ))}
                  {course.curriculum.length > 4 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      +{course.curriculum.length - 4} more
                    </span>
                  )}
                </div>

                {/* Fee */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Course Fee</span>
                    <div className="text-xl font-extrabold gradient-text-blue">
                      PKR {course.fee.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Certificate
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link to={`/courses/${course.slug}`} className="flex-1 btn-secondary !py-2 text-sm">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={`/register?course=${course.slug}`} className="flex-1 btn-primary !py-2 text-sm">
                    <Rocket className="h-4 w-4" /> Enroll
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}