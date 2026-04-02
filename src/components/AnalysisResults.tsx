import { motion } from "framer-motion";
import { AlertTriangle, HardHat, Shovel, Building2, Lightbulb } from "lucide-react";
import CircularGauge from "./CircularGauge";
import ReportGenerator from "./ReportGenerator";

interface AnalysisData {
  invalid: boolean;
  type?: "Demolition" | "Excavation" | "Construction";
  score?: number;
  solutions?: string[];
}

const typeIcons: Record<string, React.ElementType> = {
  Demolition: AlertTriangle,
  Excavation: Shovel,
  Construction: Building2,
};

const riskColorStops = [
  { threshold: 0, color: "hsl(160, 60%, 45%)" },
  { threshold: 30, color: "hsl(50, 90%, 50%)" },
  { threshold: 60, color: "hsl(25, 90%, 55%)" },
  { threshold: 80, color: "hsl(0, 72%, 51%)" },
];

const getRiskLabel = (score: number) => {
  if (score <= 3) return "Low Risk";
  if (score <= 6) return "Moderate Risk";
  return "High Risk";
};

const AnalysisResults = ({ data, image }: { data: AnalysisData; image?: string }) => {
  if (data.invalid) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 border-destructive/30 mt-6"
      >
        <div className="flex items-center gap-3 text-destructive">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-semibold text-lg">Invalid Image</p>
            <p className="text-muted-foreground text-sm">Please upload a construction site photo.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const TypeIcon = data.type ? typeIcons[data.type] || HardHat : HardHat;
  const score = data.score ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 mt-6"
    >
      {/* Type & Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Category</p>
          <div className="flex items-center gap-2">
            <TypeIcon className="w-5 h-5 text-primary" />
            <span className="text-foreground font-semibold text-lg">{data.type}</span>
          </div>
        </div>
        <div className="glass rounded-xl p-5 flex flex-col items-center">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Dust Risk Score</p>
          <CircularGauge
            value={score}
            max={10}
            size={120}
            strokeWidth={10}
            sublabel={`/ 10 — ${getRiskLabel(score)}`}
            colorStops={riskColorStops}
          />
        </div>
      </div>

      {/* Solutions */}
      {data.solutions && data.solutions.length > 0 && (
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
            Recommended Solutions
          </p>
          <ul className="space-y-3">
            {data.solutions.map((sol, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center font-mono">
                  {i + 1}
                </span>
                <span className="text-foreground/90 text-sm leading-relaxed">{sol}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* PDF Report Button */}
      <ReportGenerator
        data={{
          image,
          type: data.type,
          score: data.score,
          solutions: data.solutions,
        }}
      />
    </motion.div>
  );
};

export default AnalysisResults;
