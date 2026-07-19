import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Video, FolderGit2, Compass, Award, Code2, Sparkles, Terminal } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import AnimatedCounter from '@/components/AnimatedCounter';

const quickStats = [
  { label: 'Live Online Classes', icon: Video },
  { label: 'Practical Projects', icon: FolderGit2 },
  { label: 'Career Guidance', icon: Compass },
  { label: 'Certificate on Completion', icon: Award },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      <GradientBackground variant="mesh" />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(222 47% 11%) 1px, transparent 1px), linear-gradient(to bottom, hsl(222 47% 11%) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Pakistan's Premium Coding Academy</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Build Your Future with{' '}
              <span className="gradient-text animate-gradient-shift">CodeNova Academy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
            >
              Join live online courses designed for beginners. Learn practical skills through real projects and start your journey toward freelancing, internships, and professional careers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/register" className="btn-primary text-base">
                <Rocket className="h-5 w-5" />
                Enroll Now — Limited Seats
              </Link>
              <Link to="/courses" className="btn-secondary text-base">
                <BookOpen className="h-5 w-5" />
                View Courses
              </Link>
            </motion.div>

            {/* Social proof stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 font-bold text-foreground">
                    <AnimatedCounter value={500} suffix="+" />
                  </div>
                  <div className="text-muted-foreground">Students Enrolled</div>
                </div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-0.5 text-warning">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <div>
                  <div className="font-bold text-foreground"><AnimatedCounter value={95} suffix="%" /></div>
                  <div className="text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {quickStats.map((stat) => (
                <div key={stat.label} className="glass-card flex items-center gap-2.5 rounded-xl p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold leading-tight text-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative perspective-1000"
          >
            <Hero3DVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function Hero3DVisual() {
  return (
    <div className="relative mx-auto max-w-lg preserve-3d">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl animate-pulse" />

      {/* Main coding window card */}
      <motion.div
        animate={{ y: [0, -12, 0], rotateY: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-card-strong rounded-2xl p-1 shadow-2xl"
      >
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <div className="ml-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            codenova.jsx
          </div>
        </div>

        {/* Code content */}
        <div className="rounded-xl bg-slate-900 p-5 font-mono text-sm">
          <div className="space-y-1.5">
            <CodeLine line={1} tokens={[{ t: 'const', c: 'text-purple-400' }, { t: ' student', c: 'text-blue-300' }, { t: ' = {', c: 'text-slate-400' }]} />
            <CodeLine line={2} indent={1} tokens={[{ t: 'name', c: 'text-blue-300' }, { t: ': ', c: 'text-slate-400' }, { t: "'You'", c: 'text-green-400' }, { t: ',', c: 'text-slate-400' }]} />
            <CodeLine line={3} indent={1} tokens={[{ t: 'course', c: 'text-blue-300' }, { t: ': ', c: 'text-slate-400' }, { t: "'Full Stack'", c: 'text-green-400' }, { t: ',', c: 'text-slate-400' }]} />
            <CodeLine line={4} indent={1} tokens={[{ t: 'status', c: 'text-blue-300' }, { t: ': ', c: 'text-slate-400' }, { t: "'Building 🚀'", c: 'text-green-400' }, { t: ',', c: 'text-slate-400' }]} />
            <CodeLine line={5} tokens={[{ t: '}', c: 'text-slate-400' }]} />
            <CodeLine line={6} />
            <CodeLine line={7} tokens={[{ t: 'student', c: 'text-blue-300' }, { t: '.', c: 'text-slate-400' }, { t: 'launch', c: 'text-yellow-300' }, { t: '()', c: 'text-slate-400' }]} />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-1 inline-block h-4 w-2 bg-blue-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 top-1/4 glass-card-strong rounded-xl px-4 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Live Coding</div>
            <div className="text-[10px] text-muted-foreground">Real Projects</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-2 bottom-1/4 glass-card-strong rounded-xl px-4 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-success to-accent">
            <Award className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Certificate</div>
            <div className="text-[10px] text-muted-foreground">On Completion</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-8 -top-4 glass-card-strong rounded-xl p-2.5 shadow-xl"
      >
        <Rocket className="h-5 w-5 text-secondary" />
      </motion.div>
    </div>
  );
}

function CodeLine({ line, indent = 0, tokens = [] }) {
  return (
    <div className="flex">
      <span className="mr-3 w-4 select-none text-right text-slate-600">{line}</span>
      <span style={{ marginLeft: `${indent * 1}rem` }}>
        {tokens.map((tok, i) => (
          <span key={i} className={tok.c}>{tok.t}</span>
        ))}
      </span>
    </div>
  );
}