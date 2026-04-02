import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ChevronDown, Droplets, Wind, TreePine, Recycle, Shield, Zap } from "lucide-react";
import CircularGauge from "./CircularGauge";

const mitigationCards = [
  {
    icon: Droplets,
    title: "Water Suppression Systems",
    summary: "Reduce dust by 60-90% with automated water sprinklers",
    details: "Install automated misting systems on demolition and excavation zones. Use reclaimed water to minimize environmental impact. Schedule sprinkler activation during peak dust hours (10 AM - 4 PM).",
  },
  {
    icon: Wind,
    title: "Wind Barrier Installation",
    summary: "Block airborne particles from reaching sensitive areas",
    details: "Deploy 3-meter high wind barriers around the construction perimeter. Use geotextile fabric barriers for excavation sites. Position barriers based on prevailing wind direction analysis.",
  },
  {
    icon: TreePine,
    title: "Green Buffer Zones",
    summary: "Natural air filtration through strategic planting",
    details: "Plant fast-growing native species like Neem and Peepal trees around construction sites. Maintain a 15-meter buffer of vegetation between sites and residential areas. Green barriers can reduce PM10 by up to 30%.",
  },
  {
    icon: Recycle,
    title: "Material Management",
    summary: "Reduce waste and minimize dust-generating activities",
    details: "Cover stockpiles of sand, gravel, and other materials with tarpaulin. Use enclosed chutes for debris removal from upper floors. Implement wet cutting techniques for concrete and masonry.",
  },
  {
    icon: Shield,
    title: "Enclosure & Netting",
    summary: "Physical containment of construction dust",
    details: "Wrap building facades with fine mesh netting during external work. Install temporary enclosures around high-dust activities like grinding and sandblasting. Use scaffolding sheeting on all active floors.",
  },
  {
    icon: Zap,
    title: "Smart Monitoring",
    summary: "IoT-based real-time dust monitoring systems",
    details: "Deploy PM2.5 and PM10 sensors at key locations around the site. Set automatic alerts when dust levels exceed thresholds. Generate daily compliance reports for environmental authorities.",
  },
];

const greenColorStops = [
  { threshold: 0, color: "hsl(0, 72%, 51%)" },
  { threshold: 40, color: "hsl(25, 90%, 55%)" },
  { threshold: 60, color: "hsl(50, 90%, 50%)" },
  { threshold: 80, color: "hsl(160, 60%, 45%)" },
];

const SustainabilitySection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="sustainability" className="relative px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-mono text-xs tracking-widest uppercase">
              Green Compliance
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Sustainability & Mitigation
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Eco-friendly recommendations to minimize construction impact on air quality
          </p>
        </motion.div>

        {/* Compliance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 mb-8 flex flex-col sm:flex-row items-center gap-8"
        >
          <CircularGauge
            value={72}
            max={100}
            size={160}
            strokeWidth={14}
            label="Green Compliance Score"
            sublabel="/ 100"
            colorStops={greenColorStops}
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-foreground font-bold text-xl mb-2">Good Compliance</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              This construction site meets 72% of environmental compliance standards. 
              Implementing the recommended mitigation strategies below could improve the score to 90%+.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Water Suppression ✓", "Dust Monitoring ✓", "Wind Barriers ✗"].map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-mono px-3 py-1 rounded-full ${
                    tag.includes("✓")
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mitigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mitigationCards.map((card, i) => {
            const Icon = card.icon;
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl overflow-hidden hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-foreground font-semibold text-sm">{card.title}</h4>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">{card.summary}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 ml-14">
                        <p className="text-foreground/80 text-xs leading-relaxed border-t border-border/50 pt-3">
                          {card.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
