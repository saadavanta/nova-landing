import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Facebook, Linkedin, Mail, Phone, MessageCircle, MapPin, Send, ArrowRight } from 'lucide-react';
import { ACADEMY, whatsappLink } from '@/lib/constants';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-white to-muted/50">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-50" />

      {/* CTA Strip */}
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="-mt-px rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-[1px] shadow-2xl shadow-primary/20"
        >
          <div className="rounded-3xl bg-white px-8 py-10 sm:px-12 sm:py-12">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                  Ready to Start Your <span className="gradient-text">Tech Journey?</span>
                </h3>
                <p className="mt-2 text-muted-foreground">Join hundreds of students already learning with CodeNova Academy.</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/register" className="btn-primary">
                  Enroll Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-base font-extrabold">CodeNova</span>
                <span className="block text-[10px] font-semibold tracking-wider text-primary uppercase">Academy</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {ACADEMY.tagline} Live online coding courses designed for beginners in {ACADEMY.country} and beyond.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-6">
              <label className="text-sm font-semibold text-foreground">Subscribe to our newsletter</label>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button type="submit" className="btn-primary !px-4">
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {subscribed && <p className="mt-2 text-sm font-medium text-success">✓ Subscribed successfully!</p>}
            </form>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Courses', to: '/courses' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Courses</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                'Full Stack Web Development',
                'Frontend Development',
                'Backend Development',
                'Social Media Marketing + Canva',
                'IT Basics',
              ].map((course) => (
                <li key={course}>
                  <Link to="/courses" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`tel:${ACADEMY.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" /> {ACADEMY.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink('Hello, I have a question about CodeNova Academy')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <MessageCircle className="h-4 w-4 text-success" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${ACADEMY.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> {ACADEMY.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {ACADEMY.country}
              </li>
            </ul>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              <a href={ACADEMY.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white transition-all hover:bg-primary hover:text-white hover:border-primary" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={ACADEMY.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white transition-all hover:bg-primary hover:text-white hover:border-primary" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white transition-all hover:bg-success hover:text-white hover:border-success" aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {ACADEMY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms & Conditions</Link>
            <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-primary">Refund Policy</Link>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}