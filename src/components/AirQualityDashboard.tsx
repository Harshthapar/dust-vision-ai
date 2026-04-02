import { motion } from "framer-motion";
import { Wind, Droplets, Activity, Heart, Info } from "lucide-react";
import CircularGauge from "./CircularGauge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const mockAQI = {
  aqi: 127,
  pm25: 42.3,
  pm10: 78.6,
  co: 1.2,
  no2: 34.5,
  healthLevel: "Unhealthy for Sensitive Groups",
  healthColor: "hsl(25, 90%, 55%)",
};

const getAQICategory = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "hsl(160, 60%, 45%)", bg: "bg-green-500/10" };
  if (aqi <= 100) return { label: "Moderate", color: "hsl(50, 90%, 50%)", bg: "bg-yellow-500/10" };
  if (aqi <= 150) return { label: "Unhealthy (Sensitive)", color: "hsl(25, 90%, 55%)", bg: "bg-orange-500/10" };
  if (aqi <= 200) return { label: "Unhealthy", color: "hsl(0, 72%, 51%)", bg: "bg-red-500/10" };
  return { label: "Hazardous", color: "hsl(300, 60%, 40%)", bg: "bg-purple-500/10" };
};

const InfoTooltip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help inline-block ml-1" />
    </TooltipTrigger>
    <TooltipContent className="max-w-[240px] text-xs">{text}</TooltipContent>
  </Tooltip>
);

const AirQualityDashboard = () => {
  const category = getAQICategory(mockAQI.aqi);

  return (
    <section id="dashboard" className="relative px-4 py-16">
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
              Real-Time Monitoring
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Air Quality Dashboard
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Live environmental monitoring data from construction zones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main AQI Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-2xl p-6 flex flex-col items-center justify-center md:row-span-2 hover:border-primary/30 transition-colors"
          >
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4 flex items-center">
              Air Quality Index
              <InfoTooltip text="AQI measures overall air quality on a scale of 0-500. Higher values indicate worse air quality and greater health concerns." />
            </p>
            <CircularGauge
              value={mockAQI.aqi}
              max={500}
              size={200}
              strokeWidth={16}
              sublabel="AQI"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className={`mt-4 px-4 py-1.5 rounded-full text-xs font-semibold font-mono ${category.bg}`}
              style={{ color: category.color }}
            >
              {category.label}
            </motion.div>
          </motion.div>

          {/* PM2.5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center">
                <Droplets className="w-3.5 h-3.5 mr-1.5 text-primary" />
                PM2.5
                <InfoTooltip text="Fine particulate matter smaller than 2.5 micrometers. These particles can penetrate deep into lungs and enter the bloodstream." />
              </p>
              <span className="text-xs text-muted-foreground">μg/m³</span>
            </div>
            <div className="flex items-end gap-2">
              <motion.span
                className="text-3xl font-bold font-mono text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {mockAQI.pm25}
              </motion.span>
              <span className="text-xs text-orange-400 mb-1">↑ Above WHO limit</span>
            </div>
            <div className="mt-3 w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((mockAQI.pm25 / 75) * 100, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* PM10 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center">
                <Wind className="w-3.5 h-3.5 mr-1.5 text-primary" />
                PM10
                <InfoTooltip text="Coarse particulate matter smaller than 10 micrometers. Common in construction dust, can cause respiratory issues." />
              </p>
              <span className="text-xs text-muted-foreground">μg/m³</span>
            </div>
            <div className="flex items-end gap-2">
              <motion.span
                className="text-3xl font-bold font-mono text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {mockAQI.pm10}
              </motion.span>
              <span className="text-xs text-yellow-400 mb-1">Moderate</span>
            </div>
            <div className="mt-3 w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((mockAQI.pm10 / 150) * 100, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Health Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors"
          >
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center mb-3">
              <Heart className="w-3.5 h-3.5 mr-1.5 text-destructive" />
              Health Impact Level
            </p>
            <p className="text-foreground font-semibold text-lg" style={{ color: mockAQI.healthColor }}>
              {mockAQI.healthLevel}
            </p>
            <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
              Sensitive groups (children, elderly, those with respiratory conditions) should reduce prolonged outdoor exertion near construction zones.
            </p>
          </motion.div>

          {/* Additional pollutants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-5 hover:border-primary/30 transition-colors"
          >
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center mb-3">
              <Activity className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Other Pollutants
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground text-xs">CO</span>
                <p className="text-foreground font-bold font-mono text-xl">{mockAQI.co}</p>
                <span className="text-[10px] text-muted-foreground">mg/m³</span>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">NO₂</span>
                <p className="text-foreground font-bold font-mono text-xl">{mockAQI.no2}</p>
                <span className="text-[10px] text-muted-foreground">μg/m³</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AirQualityDashboard;
