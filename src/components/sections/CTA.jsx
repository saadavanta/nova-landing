import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container-max px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-[1px] shadow-2xl shadow-primary/30">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent px-8 py-16 sm:px-16 sm:py-20">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl animate-blob" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl animate-blob animation-delay-2000" />
            <div className="pointer-events-none absolute right-1/4 top-0 h-32 w-32 rounded-full bg-white/5 blur-xl animate-float" />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Start Your Tech Journey?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                Join CodeNova Academy today and transform your future. Live classes, real projects, expert mentorship — all at an affordable price.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  <Rocket className="h-5 w-5" />
                  Enroll Now
                </Link>
                <a
                  href={whatsappLink('Hello, I want to enroll at CodeNova Academy')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}