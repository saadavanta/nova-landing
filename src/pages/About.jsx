import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, Rocket, ArrowRight, Code2, TrendingUp, Globe } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import SectionHeading from '@/components/SectionHeading';
import { ACADEMY } from '@/lib/constants';

const values = [
  { title: 'Excellence', description: 'We strive for the highest quality in everything we teach and build.', icon: Award },
  { title: 'Accessibility', description: 'Tech education should be affordable and available to everyone.', icon: Globe },
  { title: 'Practical Learning', description: 'We believe in learning by building real, meaningful projects.', icon: Code2 },
  { title: 'Student First', description: 'Every decision we make centers on our students\' success.', icon: Users },
];

const timeline = [
  { year: '2024', title: 'CodeNova Academy Founded', description: 'Started with a mission to make tech education accessible across Pakistan.' },
  { year: '2024', title: 'First Batch Launched', description: 'Our inaugural Full Stack Web Development class began with eager students.' },
  { year: '2025', title: '500+ Students Trained', description: 'Reached a milestone of training over 500 students across multiple courses.' },
  { year: '2025', title: 'Expanding Horizons', description: 'Adding new courses and preparing for an even bigger future.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <GradientBackground />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">About Us</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering the Next Generation of <span className="gradient-text">Tech Talent</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {ACADEMY.name} was born from a simple belief: everyone deserves access to quality tech education. We're on a mission to transform beginners into confident developers, one student at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-3 text-muted-foreground">
                To provide affordable, practical, and high-quality tech education that empowers students to build real-world skills, launch successful careers, and create a positive impact in their communities.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent shadow-lg shadow-secondary/20">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-foreground">Our Vision</h2>
              <p className="mt-3 text-muted-foreground">
                To become Pakistan's most trusted coding academy, producing thousands of skilled developers who lead the digital transformation and put Pakistan on the global tech map.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Values" title="What We" highlight="Stand For" subtitle="The principles that guide everything we do at CodeNova Academy." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Journey" title="The CodeNova" highlight="Story" subtitle="From a simple idea to a thriving academy — here's how far we've come." />
          <div className="mx-auto max-w-3xl space-y-6">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-lg">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  {i < timeline.length - 1 && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent" />}
                </div>
                <div className="flex-1 pb-6">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                  <h3 className="mt-1 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-8 text-center sm:p-12">
            <Rocket className="mx-auto h-12 w-12 text-white" />
            <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">Join Our Growing Family</h2>
            <p className="mt-3 text-white/90">Become part of the CodeNova community and start building your future today.</p>
            <Link to="/register" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-all hover:-translate-y-0.5">
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}