import { motion } from "framer-motion";
import { TrendingUp, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

const weeklyData = [
  { day: "Mon", before: 42, during: 89 },
  { day: "Tue", before: 38, during: 102 },
  { day: "Wed", before: 45, during: 95 },
  { day: "Thu", before: 40, during: 118 },
  { day: "Fri", before: 35, during: 132 },
  { day: "Sat", before: 30, during: 76 },
  { day: "Sun", before: 28, during: 54 },
];

const monthlyData = [
  { month: "Jan", aqi: 45 },
  { month: "Feb", aqi: 52 },
  { month: "Mar", aqi: 68 },
  { month: "Apr", aqi: 95 },
  { month: "May", aqi: 127 },
  { month: "Jun", aqi: 142 },
  { month: "Jul", aqi: 138 },
  { month: "Aug", aqi: 155 },
  { month: "Sep", aqi: 119 },
  { month: "Oct", aqi: 98 },
  { month: "Nov", aqi: 72 },
  { month: "Dec", aqi: 55 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs border border-border/50">
      <p className="text-foreground font-semibold mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: <span className="font-mono font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const DataVisualization = () => {
  return (
    <section id="trends" className="relative px-4 py-16">
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
              Data Analytics
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Environmental Trends
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Track air quality changes before and during construction activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-foreground font-semibold">AQI: Before vs During Construction</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDuring" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 16%, 50%)" fontSize={11} tickLine={false} />
                <YAxis stroke="hsl(215, 16%, 50%)" fontSize={11} tickLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="before"
                  name="Before Construction"
                  stroke="hsl(160, 60%, 45%)"
                  fill="url(#colorBefore)"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={2000}
                />
                <Area
                  type="monotone"
                  dataKey="during"
                  name="During Construction"
                  stroke="hsl(0, 72%, 51%)"
                  fill="url(#colorDuring)"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="text-foreground font-semibold">Monthly AQI Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 18%)" />
                <XAxis dataKey="month" stroke="hsl(215, 16%, 50%)" fontSize={11} tickLine={false} />
                <YAxis stroke="hsl(215, 16%, 50%)" fontSize={11} tickLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="aqi"
                  name="AQI"
                  stroke="hsl(160, 60%, 45%)"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(160, 60%, 45%)", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "hsl(160, 60%, 45%)", strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
