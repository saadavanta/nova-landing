import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';

const fallbackTestimonials = [
  {
    student_name: 'Ahmed Raza',
    course: 'Full Stack Web Development',
    rating: 5,
    review: 'CodeNova Academy completely changed my career path. I went from zero coding knowledge to building full-stack applications. The live classes and mentor support were incredible!',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  },
  {
    student_name: 'Fatima Khan',
    course: 'Frontend Development',
    rating: 5,
    review: 'The instructors are amazing and always ready to help. I built my first portfolio website within 2 months. The certificate helped me land a freelance gig immediately!',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    student_name: 'Bilal Ahmed',
    course: 'Backend Development',
    rating: 5,
    review: 'Best decision I ever made. The practical projects gave me real confidence. I\'m now working as a junior backend developer. Thank you CodeNova!',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    student_name: 'Ayesha Malik',
    course: 'Social Media Marketing + Canva',
    rating: 5,
    review: 'I learned so much in just 2 months. The Canva skills and marketing strategies I learned helped me start my own small agency. Highly recommended!',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
  {
    student_name: 'Hassan Ali',
    course: 'IT Basics',
    rating: 5,
    review: 'As a complete beginner, I was nervous. But the small batch learning and patient teachers made everything easy to understand. Now I\'m confident with computers!',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Testimonial.filter({ status: 'Published' }, '-display_order', 10)
      .then((data) => {
        if (data && data.length > 0) setTestimonials(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Success Stories"
          title="What Our"
          highlight="Students Say"
          subtitle="Real stories from real students who transformed their careers with CodeNova Academy."
        />

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card-strong rounded-3xl p-8 sm:p-12"
            >
              <Quote className="h-10 w-10 text-primary/20" />

              <div className="mt-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                ))}
              </div>

              <p className="mt-4 text-lg text-foreground sm:text-xl">"{t.review}"</p>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={t.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.student_name)}&background=2563EB&color=fff`}
                  alt={t.student_name}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-bold text-foreground">{t.student_name}</div>
                  <div className="text-sm text-primary">{t.course}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white transition-all hover:bg-primary hover:text-white hover:border-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-gradient-to-r from-primary to-secondary' : 'w-2 bg-border'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white transition-all hover:bg-primary hover:text-white hover:border-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}