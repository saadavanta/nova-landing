import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Flame } from 'lucide-react';

export default function UrgencyBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('urgency_banner_dismissed');
    if (dismissed) setVisible(false);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('urgency_banner_dismissed', '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-[60] overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent"
        >
          <div className="container-max flex items-center justify-center gap-3 px-4 py-2.5 text-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="h-4 w-4 shrink-0 text-white" />
            </motion.div>
            <p className="text-sm font-semibold text-white sm:text-base">
              <span className="hidden sm:inline">New Batch Starting Soon — </span>
              Limited Seats Available!
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white/30 sm:text-sm"
            >
              <Rocket className="h-3 w-3" /> Enroll Now
            </Link>
            <button
              onClick={handleDismiss}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}