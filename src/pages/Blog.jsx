import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader2, Search } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { base44 } from '@/api/base44Client';

const fallbackPosts = [
  {
    title: 'Why Learning to Code is the Best Investment for Your Future',
    slug: 'why-learning-to-code',
    excerpt: 'In today\'s digital world, coding skills open doors to countless career opportunities. Here\'s why you should start your coding journey today.',
    featured_image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop',
    category: 'Career',
    author: 'CodeNova Academy',
    publish_date: '2025-01-15T10:00:00Z',
  },
  {
    title: '5 Web Development Trends to Watch in 2025',
    slug: 'web-development-trends-2025',
    excerpt: 'Stay ahead of the curve with these emerging web development trends that are shaping the industry this year.',
    featured_image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop',
    category: 'Web Development',
    author: 'CodeNova Academy',
    publish_date: '2025-02-01T10:00:00Z',
  },
  {
    title: 'How to Start Freelancing as a Beginner Developer',
    slug: 'freelancing-for-beginners',
    excerpt: 'Ready to earn with your new coding skills? Here\'s a complete guide to landing your first freelance clients.',
    featured_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    category: 'Freelancing',
    author: 'CodeNova Academy',
    publish_date: '2025-02-15T10:00:00Z',
  },
  {
    title: 'The Complete Guide to HTML for Absolute Beginners',
    slug: 'html-for-beginners',
    excerpt: 'Everything you need to know to start building web pages with HTML. A beginner-friendly tutorial from CodeNova Academy.',
    featured_image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=500&fit=crop',
    category: 'Tutorials',
    author: 'CodeNova Academy',
    publish_date: '2025-03-01T10:00:00Z',
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    base44.entities.BlogPost.filter({ publish_status: 'Published' }, '-publish_date', 20)
      .then((data) => { if (data && data.length > 0) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))];
  const filtered = posts.filter((p) => {
    const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-8">
        <GradientBackground />
        <div className="container-max relative px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">Blog</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Insights & <span className="gradient-text">Resources</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tips, tutorials, and stories to help you on your coding journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Search & Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full rounded-xl border border-border bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'border border-border bg-white text-muted-foreground hover:text-primary'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No articles found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.article key={post.slug || post.id || i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.featured_image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {post.category && <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur">{post.category}</span>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {post.author && <span>{post.author}</span>}
                      {post.publish_date && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}