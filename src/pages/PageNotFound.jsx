import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Rocket } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';

export default function PageNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <GradientBackground />
      <div className="container-max relative px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-[120px] font-extrabold leading-none gradient-text sm:text-[180px]">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">Page Not Found</h2>
          <p className="mt-3 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/" className="btn-primary"><Home className="h-4 w-4" /> Back Home</Link>
            <Link to="/courses" className="btn-secondary"><Rocket className="h-4 w-4" /> View Courses</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}