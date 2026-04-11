import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SpotlightSection from "@/components/SpotlightSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import VideoRow from "@/components/VideoRow";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <SpotlightSection />
                <VideoRow />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
