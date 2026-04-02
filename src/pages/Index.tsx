import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadAnalyzer from "@/components/UploadAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <UploadAnalyzer />
      <footer className="text-center py-8 text-muted-foreground text-xs font-mono border-t border-border">
        DustVision AI — Construction Site Dust Analysis
      </footer>
    </div>
  );
};

export default Index;
