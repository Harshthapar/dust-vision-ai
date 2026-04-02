import { motion } from "framer-motion";
import { Shield, Zap, Eye } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      
      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            AI-Powered Analysis
          </span>
          <div className="h-px w-8 bg-primary" />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="text-gradient">DustVision</span>
          <span className="text-foreground"> AI</span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Real-time construction site dust risk analysis powered by multimodal AI. 
          Upload a photo and get instant categorization, risk scoring, and mitigation strategies.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {[
            { icon: Eye, label: "Visual Analysis" },
            { icon: Zap, label: "Instant Results" },
            { icon: Shield, label: "Risk Mitigation" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
