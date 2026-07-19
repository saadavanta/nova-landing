import { motion } from 'framer-motion';
import { Video, FolderGit2, Compass, FileText, MessageSquare, Wallet, Users, Rocket, Headphones } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const iconMap = { Video, FolderGit2, Compass, FileText, MessageSquare, Wallet, Users, Rocket, Headphones };

const features = [
  { title: 'Live Interactive Classes', description: 'Learn in real-time with expert instructors. Ask questions, get instant feedback, and never feel lost.', icon: 'Video' },
  { title: 'Practical Projects', description: 'Build real-world projects that you can showcase in your portfolio and job interviews.', icon: 'FolderGit2' },
  { title: 'Career Guidance', description: 'Get personalized career advice and direction to help you land your dream tech role.', icon: 'Compass' },
  { title: 'Resume Building', description: 'Learn to craft a professional resume that stands out to recruiters and hiring managers.', icon: 'FileText' },
  { title: 'Interview Preparation', description: 'Practice with mock interviews and gain the confidence to ace any technical interview.', icon: 'MessageSquare' },
  { title: 'Affordable Fees', description: 'Quality tech education at fees that make sense. Invest in your future without breaking the bank.', icon: 'Wallet' },
  { title: 'Small Batch Learning', description: 'Limited seats per batch means you get the personal attention you deserve to succeed.', icon: 'Users' },
  { title: 'Modern Curriculum', description: 'Stay ahead with a curriculum updated to match the latest industry standards and tools.', icon: 'Rocket' },
  { title: 'Continuous Support', description: 'Get help even after class hours. Our mentors are always just a message away.', icon: 'Headphones' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-muted/30 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why CodeNova"
          title="Why Choose"
          highlight="CodeNova Academy"
          subtitle="We go beyond just teaching code. We build careers, foster confidence, and support you every step of the way."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Gradient accent */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 transition-transform group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}