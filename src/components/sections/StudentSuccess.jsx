import { motion } from 'framer-motion';
import { Users, BookOpen, FolderGit2, Smile } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = [
  { value: 500, suffix: '+', label: 'Students Trained', icon: Users },
  { value: 5, suffix: '+', label: 'Professional Courses', icon: BookOpen },
  { value: 100, suffix: '+', label: 'Projects Completed', icon: FolderGit2 },
  { value: 95, suffix: '%', label: 'Student Satisfaction', icon: Smile },
];

export default function StudentSuccess() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            Student Success
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Numbers That <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Our students don't just learn — they build, launch, and succeed. Here's what we've achieved together.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mt-4 text-4xl font-extrabold gradient-text-blue sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}