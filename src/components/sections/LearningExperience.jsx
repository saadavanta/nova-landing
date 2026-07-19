import { motion } from 'framer-motion';
import { Video, PlayCircle, Code2, Compass, FileText, Briefcase, Building2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const iconMap = { Video, PlayCircle, Code2, Compass, FileText, Briefcase, Building2 };

const items = [
  { title: 'Live Classes', description: 'Interactive sessions with real-time Q&A and hands-on guidance', icon: 'Video' },
  { title: 'Recorded Resources', description: 'Future-ready recorded lessons for revision and self-paced learning', icon: 'PlayCircle' },
  { title: 'Practical Coding', description: 'Hands-on coding exercises and challenges every single session', icon: 'Code2' },
  { title: 'Career Mentoring', description: 'One-on-one guidance from industry experts who care about your growth', icon: 'Compass' },
  { title: 'Resume Support', description: 'Professional resume building assistance to land your first interview', icon: 'FileText' },
  { title: 'Portfolio Guidance', description: 'Build a standout portfolio of real projects that impress employers', icon: 'Briefcase' },
  { title: 'Internship Preparation', description: 'Get ready for real-world internship opportunities and job placements', icon: 'Building2' },
];

export default function LearningExperience() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Learning Experience"
          title="Everything You Need to"
          highlight="Succeed"
          subtitle="A complete learning ecosystem designed to support you from day one to your first job."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 transition-all group-hover:from-primary group-hover:to-secondary">
                  <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}