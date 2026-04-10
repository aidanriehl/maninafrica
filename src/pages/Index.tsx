import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DonationSection from "@/components/DonationSection";
import StorySection from "@/components/StorySection";
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
        <DonationSection />
        <StorySection />
        <VideoRow />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
