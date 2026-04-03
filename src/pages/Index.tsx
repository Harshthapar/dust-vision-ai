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
      <footer className="border-t border-border py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg font-bold text-foreground tracking-tight mb-6">OUR TEAM</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Harsh Sharma", "Manya Yadav", "Chakshu Girdhar", "Dhruv Garg", "Avika", "Devyanshi Chopra", "Krish", "Khushi Anand"].map((name) => (
              <span key={name} className="px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground">
                {name}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-mono">DustVision AI — Environmental Impact Monitoring Platform</p>
          <p className="mt-1 text-xs text-muted-foreground/50 font-mono">Impact of Construction on Local Air Quality</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
