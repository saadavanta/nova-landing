import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, LogIn, UserPlus, Rocket } from 'lucide-react';
import UrgencyBanner from '@/components/sections/UrgencyBanner';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Success Stories', href: '/#testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 z-50 w-full"
      >
        <UrgencyBanner />
        <div className={`container-max px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'py-2' : 'py-4'
        }`}>
          <nav
            className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
              scrolled
                ? 'glass-card-strong shadow-lg'
                : 'bg-white/40 backdrop-blur-md border border-white/30'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                <Code2 className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent to-secondary opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="leading-tight">
                <span className="block text-base font-extrabold text-foreground">CodeNova</span>
                <span className="block text-[10px] font-semibold tracking-wider text-primary uppercase">Academy</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-white/60 px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 text-sm">
                <Rocket className="h-4 w-4" />
                Enroll Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 glass-card-strong p-6 pt-24"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-4 border-border" />
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                  <Rocket className="h-4 w-4" /> Enroll Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}