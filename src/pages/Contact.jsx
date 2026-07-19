import ContactSection from '@/components/sections/Contact';
import GradientBackground from '@/components/GradientBackground';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-8">
        <GradientBackground />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">Contact</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              We'd Love to <span className="gradient-text">Hear From You</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Questions about courses, enrollment, or anything else? Reach out and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}