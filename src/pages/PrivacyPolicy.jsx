import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { ACADEMY } from '@/lib/constants';

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-16">
      <GradientBackground />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          <div className="glass-card-strong rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary"><Shield className="h-6 w-6 text-white" /></div>
              <h1 className="text-3xl font-extrabold text-foreground">Privacy Policy</h1>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2025</p>
            <div className="prose prose-slate mt-6 max-w-none space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>At {ACADEMY.name}, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
              <h2 className="text-lg font-bold text-foreground">Information We Collect</h2>
              <p>We collect information you provide during registration, including your name, email address, phone number, city, educational background, and payment details. We also collect usage data to improve our services.</p>
              <h2 className="text-lg font-bold text-foreground">How We Use Your Information</h2>
              <p>Your information is used to process enrollments, verify payments, provide course access, send notifications, and improve our educational offerings. We never sell your data to third parties.</p>
              <h2 className="text-lg font-bold text-foreground">Data Security</h2>
              <p>We implement appropriate security measures including password hashing, encrypted connections, and secure data storage to protect your personal information from unauthorized access.</p>
              <h2 className="text-lg font-bold text-foreground">Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information. Contact us at {ACADEMY.email} to exercise these rights.</p>
              <h2 className="text-lg font-bold text-foreground">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at {ACADEMY.email} or {ACADEMY.phoneDisplay}.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}