import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import HeartDivider from "@/components/ui/HeartDivider";
import AboutPreview from "@/components/home/AboutPreview";
import ReviewWidget from "@/components/home/ReviewWidget";
import BlogPreview from "@/components/home/BlogPreview";
import BookingCTA from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesPreview />
      <HeartDivider />
      <AboutPreview />
      <HeartDivider />
      <ReviewWidget />
      <BlogPreview />
      <BookingCTA />
    </>
  );
}
