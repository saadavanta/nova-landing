import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { ACADEMY } from '@/lib/constants';

export default function Terms() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-16">
      <GradientBackground />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          <div className="glass-card-strong rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary"><FileText className="h-6 w-6 text-white" /></div>
              <h1 className="text-3xl font-extrabold text-foreground">Terms & Conditions</h1>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <h2 className="text-lg font-bold text-foreground">Enrollment</h2>
              <p>By enrolling in any course at {ACADEMY.name}, you agree to provide accurate information and complete the payment process. Your enrollment is confirmed only after payment verification.</p>
              <h2 className="text-lg font-bold text-foreground">Course Access</h2>
              <p>Students receive access to live classes and course materials for the duration of their enrolled course. Access is non-transferable and limited to the registered student.</p>
              <h2 className="text-lg font-bold text-foreground">Code of Conduct</h2>
              <p>Students are expected to maintain respectful behavior during classes. Any form of harassment, cheating, or disruptive conduct may result in suspension without refund.</p>
              <h2 className="text-lg font-bold text-foreground">Intellectual Property</h2>
              <p>All course materials, videos, and resources provided by {ACADEMY.name} are our intellectual property. Students may not redistribute or sell course content.</p>
              <h2 className="text-lg font-bold text-foreground">Certification</h2>
              <p>Certificates are awarded only to students who complete all course requirements, including attendance and project submissions.</p>
              <h2 className="text-lg font-bold text-foreground">Contact</h2>
              <p>Questions about these terms? Contact us at {ACADEMY.email}.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}