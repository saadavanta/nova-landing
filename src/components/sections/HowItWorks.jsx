import { motion } from 'framer-motion';
import { BookOpen, UserPlus, CreditCard, ShieldCheck, Video, Code2, Award, Rocket } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const iconMap = { BookOpen, UserPlus, CreditCard, ShieldCheck, Video, Code2, Award, Rocket };

const steps = [
  { step: 1, title: 'Choose Your Course', icon: 'BookOpen' },
  { step: 2, title: 'Register Online', icon: 'UserPlus' },
  { step: 3, title: 'Complete Payment', icon: 'CreditCard' },
  { step: 4, title: 'Account Approval', icon: 'ShieldCheck' },
  { step: 5, title: 'Join Live Classes', icon: 'Video' },
  { step: 6, title: 'Complete Projects', icon: 'Code2' },
  { step: 7, title: 'Receive Certificate', icon: 'Award' },
  { step: 8, title: 'Build Your Career', icon: 'Rocket' },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="Your Journey in"
          highlight="8 Simple Steps"
          subtitle="From choosing your course to launching your career — here's exactly how your CodeNova journey unfolds."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2" />

          {steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-center gap-6 pb-8 md:pb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Icon node */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <Icon className="h-5 w-5 text-white" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary shadow">
                    {step.step}
                  </span>
                </div>

                {/* Content card */}
                <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass-card rounded-2xl p-5">
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.step === 1 && 'Browse our courses and pick the one that matches your goals.'}
                      {step.step === 2 && 'Fill out the registration form with your details and selected course.'}
                      {step.step === 3 && 'Pay via JazzCash or Easypaisa and upload your payment proof.'}
                      {step.step === 4 && 'Our team verifies your payment and activates your account.'}
                      {step.step === 5 && 'Join live online classes and start learning from day one.'}
                      {step.step === 6 && 'Build real-world projects with guidance from your instructors.'}
                      {step.step === 7 && 'Receive your professional CodeNova Academy certificate.'}
                      {step.step === 8 && 'Use your skills for freelancing, internships, and jobs.'}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}