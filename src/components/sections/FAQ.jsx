import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import { whatsappLink } from '@/lib/constants';

const fallbackFAQs = [
  { question: 'Who can join CodeNova Academy?', answer: 'Anyone! Our courses are designed for school students, college students, university students, graduates, beginners, and career switchers. If you have the passion to learn, you belong here.' },
  { question: 'Do I need prior coding experience?', answer: 'Not at all! All our courses start from the very basics. You just need a computer, internet connection, and the willingness to learn. We take you from zero to job-ready.' },
  { question: 'Are classes live or pre-recorded?', answer: 'All our classes are 100% live and interactive. You can ask questions, participate in discussions, and get real-time feedback from your instructors. We also plan to add recorded resources in the future.' },
  { question: 'Will I receive a certificate?', answer: 'Yes! Students who successfully complete their course requirements receive a professional CodeNova Academy Certificate of Completion that you can add to your resume and LinkedIn.' },
  { question: 'How do payments work?', answer: 'After registering, you\'ll be directed to a payment page where you can pay via JazzCash or Easypaisa. Simply send the course fee to the provided number, then upload your payment screenshot for verification.' },
  { question: 'Which payment methods are accepted?', answer: 'We currently accept JazzCash and Easypaisa. Both are quick, easy, and widely used across Pakistan. More payment methods may be added in the future.' },
  { question: 'How long are the courses?', answer: 'Course durations vary: Full Stack Web Development is 4 months, IT Basics is 3 months, and Frontend Development, Backend Development, and Social Media Marketing + Canva are each 2 months.' },
  { question: 'Will I build real projects?', answer: 'Absolutely! Practical projects are at the core of every course. You\'ll build real-world applications and a portfolio that you can showcase to employers and clients.' },
  { question: 'Can school students join?', answer: 'Yes! We welcome school students. Our IT Basics and Frontend Development courses are especially great starting points for younger learners interested in technology.' },
  { question: 'How do I contact support?', answer: 'You can reach us via WhatsApp, phone, or email. We also have a contact form on our website. Our support team is always ready to help with any questions you have.' },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(fallbackFAQs);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.FAQ.filter({ status: 'Published' }, 'display_order', 20)
      .then((data) => { if (data && data.length > 0) setFaqs(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Got questions? We've got answers. Find everything you need to know about CodeNova Academy."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/50"
                aria-expanded={openIndex === i}
              >
                <span className="flex items-center gap-3 font-semibold text-foreground">
                  <HelpCircle className={`h-5 w-5 shrink-0 transition-colors ${openIndex === i ? 'text-primary' : 'text-muted-foreground'}`} />
                  {faq.question}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180 text-primary' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 pl-12 text-sm text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <p className="text-muted-foreground">Still have questions?</p>
          <div className="mt-4 flex justify-center gap-3">
            <a
              href={whatsappLink('Hello, I have a question about CodeNova Academy courses')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}