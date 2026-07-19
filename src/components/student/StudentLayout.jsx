import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, User, LogOut, Menu, Code2, ExternalLink, Bell } from 'lucide-react';

const navItems = [
  { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/student/course', label: 'My Course', icon: BookOpen },
  { to: '/student/profile', label: 'Profile', icon: User },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Admins belong in the admin panel, not the student portal
  if (user?.role === 'admin') {
    navigate('/admin', { replace: true });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
          <Code2 className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <span className="block text-sm font-extrabold">CodeNova</span>
          <span className="block text-[10px] font-semibold tracking-wider text-primary uppercase">Student Portal</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link to="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
          <ExternalLink className="h-4.5 w-4.5" /> View Website
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-destructive/10">
          <LogOut className="h-4.5 w-4.5" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-white border-r border-border z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-border z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden rounded-lg p-2 hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Student Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 hover:bg-muted">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2.5 border-l border-border pl-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                {user?.full_name?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-foreground">{user?.full_name || 'Student'}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
