import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { ACADEMY } from '@/lib/constants';

export default function RefundPolicy() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-16">
      <GradientBackground />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          <div className="glass-card-strong rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary"><RefreshCw className="h-6 w-6 text-white" /></div>
              <h1 className="text-3xl font-extrabold text-foreground">Refund Policy</h1>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <h2 className="text-lg font-bold text-foreground">Payment Verification</h2>
              <p>All payments are verified before account activation. If your payment cannot be verified, we will contact you for clarification.</p>
              <h2 className="text-lg font-bold text-foreground">Refund Eligibility</h2>
              <p>Refunds may be considered under the following circumstances: duplicate payments, course cancellation by {ACADEMY.name}, or if you request a refund before the first class begins.</p>
              <h2 className="text-lg font-bold text-foreground">Non-Refundable Cases</h2>
              <p>Once classes have begun, fees are non-refundable. Refunds are not provided for students who are suspended due to violation of terms.</p>
              <h2 className="text-lg font-bold text-foreground">Refund Process</h2>
              <p>To request a refund, contact us at {ACADEMY.email} with your registration details. Approved refunds are processed within 7-14 business days to the original payment method.</p>
              <h2 className="text-lg font-bold text-foreground">Contact</h2>
              <p>Questions about refunds? Contact us at {ACADEMY.email} or {ACADEMY.phoneDisplay}.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}