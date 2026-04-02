import { motion } from "framer-motion";
import { Factory, Users, Globe, BarChart3 } from "lucide-react";

const stats = [
  { icon: Factory, value: "30%", label: "of urban air pollution comes from construction activities" },
  { icon: Users, value: "4.2M", label: "premature deaths annually linked to ambient air pollution" },
  { icon: Globe, value: "23%", label: "increase in PM2.5 levels near active construction zones" },
  { icon: BarChart3, value: "150m", label: "radius of elevated dust levels around typical construction sites" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-mono text-xs tracking-widest uppercase">
              About the Project
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Impact of Construction on Air Quality
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-foreground/90 leading-relaxed">
              Construction activities are one of the largest contributors to urban air pollution, 
              generating significant quantities of particulate matter (PM2.5 and PM10), volatile 
              organic compounds, and other harmful pollutants.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Activities such as demolition, excavation, concrete mixing, and material transport 
              release fine dust particles that can travel hundreds of meters from the source, 
              affecting the health of nearby residents, workers, and especially vulnerable 
              populations like children and the elderly.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              DustVision AI leverages multimodal artificial intelligence to analyze construction 
              sites in real-time, providing instant risk assessments and actionable mitigation 
              strategies to help reduce the environmental impact of construction activities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-foreground font-bold text-lg mb-4">Key Environmental Facts</h3>
            <div className="space-y-4">
              {[
                "Construction dust contains silica, calcium carbonate, and cement particles that cause respiratory diseases",
                "PM2.5 particles are small enough to penetrate lung tissue and enter the bloodstream",
                "Uncontrolled construction sites can increase local PM10 levels by 200-400%",
                "WHO estimates that 99% of the global population breathes air exceeding safe limits",
                "Proper dust control measures can reduce construction emissions by up to 90%"
              ].map((fact, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    {i + 1}
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 text-center hover:border-primary/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-[11px] mt-1 leading-tight">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
