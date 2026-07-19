import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Facebook, Linkedin, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import { ACADEMY, whatsappLink } from '@/lib/constants';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await base44.entities.ContactMessage.create(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again or contact us on WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    { icon: Phone, label: 'Phone', value: ACADEMY.phoneDisplay, href: `tel:${ACADEMY.phone}`, color: 'from-primary to-secondary' },
    { icon: MessageCircle, label: 'WhatsApp', value: ACADEMY.phoneDisplay, href: whatsappLink('Hello, I have a question'), color: 'from-success to-accent' },
    { icon: Mail, label: 'Email', value: ACADEMY.email, href: `mailto:${ACADEMY.email}`, color: 'from-secondary to-accent' },
    { icon: MapPin, label: 'Location', value: ACADEMY.country, href: '#', color: 'from-primary to-accent' },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact Us"
          title="Get in"
          highlight="Touch"
          subtitle="Have questions? We're here to help. Reach out through any of these channels or send us a message."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.label === 'WhatsApp' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card group flex items-center gap-4 rounded-2xl p-5"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{card.label}</div>
                    <div className="truncate text-sm font-bold text-foreground">{card.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Follow Us</h3>
              <div className="mt-4 flex gap-3">
                <a href={ACADEMY.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white transition-all hover:bg-primary hover:text-white hover:border-primary" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={ACADEMY.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white transition-all hover:bg-primary hover:text-white hover:border-primary" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white transition-all hover:bg-success hover:text-white hover:border-success" aria-label="WhatsApp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-strong rounded-3xl p-6 sm:p-8"
          >
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <CheckCircle2 className="h-16 w-16 text-success" />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Full Name" error={errors.name}>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </FormField>
                  <FormField label="Email" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </FormField>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Phone">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+92 3XX XXXXXXX"
                      className="form-input"
                    />
                  </FormField>
                  <FormField label="Subject" error={errors.subject}>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder="How can we help?"
                      className="form-input"
                    />
                  </FormField>
                </div>
                <FormField label="Message" error={errors.message}>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Your message..."
                    className="form-input resize-none"
                  />
                </FormField>

                {errors.submit && <p className="text-sm text-destructive">{errors.submit}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {submitting ? (
                    <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: rgba(255,255,255,0.8);
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.12);
        }
        .form-input::placeholder { color: hsl(var(--muted-foreground) / 0.6); }
      `}</style>
    </section>
  );
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-foreground">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}