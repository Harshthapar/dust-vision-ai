import { motion } from "framer-motion";
import { Shield, Zap, Eye, MapPin, BarChart3, Leaf } from "lucide-react";

const features = [
  { icon: Eye, label: "AI Visual Analysis" },
  { icon: Zap, label: "Instant Results" },
  { icon: Shield, label: "Risk Mitigation" },
  { icon: MapPin, label: "Geo-Intelligence" },
  { icon: BarChart3, label: "Data Analytics" },
  { icon: Leaf, label: "Green Compliance" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[65vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Environmental Impact Monitoring
          </span>
          <div className="h-px w-8 bg-primary" />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="text-gradient">DustVision</span>
          <span className="text-foreground"> AI</span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
          Comprehensive environmental impact monitoring platform for construction sites.
          Analyze air quality, track pollution, and ensure green compliance.
        </p>
        <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          Impact of Construction on Local Air Quality — Powered by Multimodal AI
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          {features.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
