import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ThemesPreviewSection from "@/components/ThemesPreviewSection";
import AnalyticsPreviewSection from "@/components/AnalyticsPreviewSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ThemesPreviewSection />
      <AnalyticsPreviewSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
