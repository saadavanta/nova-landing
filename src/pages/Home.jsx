import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/sections/TrustBadges';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import LearningExperience from '@/components/sections/LearningExperience';
import StudentSuccess from '@/components/sections/StudentSuccess';
import Certification from '@/components/sections/Certification';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Contact from '@/components/sections/Contact';
import FloatingEnroll from '@/components/sections/FloatingEnroll';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedCourses />
      <WhyChooseUs />
      <HowItWorks />
      <LearningExperience />
      <StudentSuccess />
      <Certification />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
      <FloatingEnroll />
    </>
  );
}