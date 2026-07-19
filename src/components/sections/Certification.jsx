import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function Certification() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Certificate mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="rounded-2xl border-4 border-primary bg-white p-8 shadow-2xl" style={{ borderImage: 'linear-gradient(135deg, hsl(221 83% 53%), hsl(262 83% 58%), hsl(199 89% 60%)) 1' }}>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Certificate of Completion</p>
                  <h3 className="mt-3 text-2xl font-extrabold gradient-text">CodeNova Academy</h3>
                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <p className="text-sm text-muted-foreground">This certifies that</p>
                  <p className="mt-2 text-lg font-bold text-foreground">Your Name Here</p>
                  <p className="mt-2 text-sm text-muted-foreground">has successfully completed</p>
                  <p className="mt-1 text-base font-semibold text-primary">Full Stack Web Development</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-left">
                      <div className="h-8 w-24 border-b-2 border-foreground/30" />
                      <p className="mt-1 text-[10px] text-muted-foreground">Instructor</p>
                    </div>
                    <Sparkles className="h-8 w-8 text-secondary" />
                    <div className="text-right">
                      <div className="h-8 w-24 border-b-2 border-foreground/30" />
                      <p className="mt-1 text-[10px] text-muted-foreground">Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
              Certification
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Earn a Certificate That <span className="gradient-text">Matters</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Students who successfully complete the course requirements will receive a professional CodeNova Academy Certificate of Completion — a testament to your skills and dedication.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Recognized proof of your skills and completion',
                'Add to your LinkedIn and resume',
                'Stand out to employers and clients',
                'Validate your practical project work',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/register" className="btn-primary mt-8">
              Start Learning Today <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}