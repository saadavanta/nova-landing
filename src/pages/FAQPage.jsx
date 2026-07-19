import FAQSection from '@/components/sections/FAQ';
import GradientBackground from '@/components/GradientBackground';
import { motion } from 'framer-motion';

export default function FAQPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-8">
        <GradientBackground />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">FAQ</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Everything you need to know about CodeNova Academy courses, enrollment, payments, and more.
            </p>
          </motion.div>
        </div>
      </section>
      <FAQSection />
    </>
  );
}