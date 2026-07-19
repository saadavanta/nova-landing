import { motion } from 'framer-motion';
import { Video, FolderGit2, Sparkles, Target, Wallet, Award, Users } from 'lucide-react';

const badges = [
  { title: 'Live Classes', icon: Video },
  { title: 'Real Projects', icon: FolderGit2 },
  { title: 'Beginner Friendly', icon: Sparkles },
  { title: 'Career Focused', icon: Target },
  { title: 'Affordable Fees', icon: Wallet },
  { title: 'Certificate', icon: Award },
  { title: 'Mentor Support', icon: Users },
];

export default function TrustBadges() {
  return (
    <section className="relative border-y border-border bg-white py-10">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Trusted by Students Across Pakistan
        </motion.p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 transition-all group-hover:from-primary group-hover:to-secondary">
                <badge.icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">{badge.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}