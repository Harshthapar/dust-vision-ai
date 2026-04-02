import { motion } from "framer-motion";

interface CircularGaugeProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorStops?: { threshold: number; color: string }[];
}

const defaultColorStops = [
  { threshold: 0, color: "hsl(160, 60%, 45%)" },
  { threshold: 30, color: "hsl(50, 90%, 50%)" },
  { threshold: 60, color: "hsl(25, 90%, 55%)" },
  { threshold: 80, color: "hsl(0, 72%, 51%)" },
];

const getColor = (value: number, max: number, stops: typeof defaultColorStops) => {
  const pct = (value / max) * 100;
  for (let i = stops.length - 1; i >= 0; i--) {
    if (pct >= stops[i].threshold) return stops[i].color;
  }
  return stops[0].color;
};

const CircularGauge = ({
  value,
  max,
  size = 160,
  strokeWidth = 12,
  label,
  sublabel,
  colorStops = defaultColorStops,
}: CircularGaugeProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);
  const color = getColor(value, max, colorStops);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold font-mono text-foreground"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {value.toFixed(1)}
          </motion.span>
          {sublabel && (
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {sublabel}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

export default CircularGauge;
