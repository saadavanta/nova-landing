import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

export default function FloatingEnroll() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 sm:left-auto sm:right-5 sm:translate-x-0"
        >
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-bold text-white shadow-xl shadow-primary/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
          >
            <Rocket className="h-5 w-5" />
            Enroll Now
          </Link>
          <a
            href={whatsappLink('Hello, I want to enroll at CodeNova Academy')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white shadow-xl shadow-success/30 transition-all hover:scale-105"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}