import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadAnalyzer from "@/components/UploadAnalyzer";
import AirQualityDashboard from "@/components/AirQualityDashboard";
import DataVisualization from "@/components/DataVisualization";
import PollutionMap from "@/components/PollutionMap";
import SustainabilitySection from "@/components/SustainabilitySection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <UploadAnalyzer />
      <AirQualityDashboard />
      <DataVisualization />
      <PollutionMap />
      <SustainabilitySection />
      <AboutSection />
      <footer className="text-center py-10 text-muted-foreground text-xs font-mono border-t border-border">
        <p>DustVision AI — Environmental Impact Monitoring Platform</p>
        <p className="mt-1 text-muted-foreground/50">
          Impact of Construction on Local Air Quality
        </p>
      </footer>
    </div>
  );
};

export default Index;
