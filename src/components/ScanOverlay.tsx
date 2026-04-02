import { motion } from "framer-motion";

const ScanOverlay = () => {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden rounded-lg pointer-events-none">
      {/* Scanning laser line */}
      <motion.div
        className="absolute left-0 right-0 h-1 scan-line"
        style={{ boxShadow: "0 0 20px 4px hsl(var(--emerald-glow) / 0.5)" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Corner brackets */}
      <div className="absolute inset-0">
        {/* Top-left */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
        {/* Top-right */}
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
        {/* Bottom-left */}
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
        {/* Bottom-right */}
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
      </div>
      {/* Overlay tint */}
      <div className="absolute inset-0 bg-primary/5 animate-pulse-glow" />
    </div>
  );
};

export default ScanOverlay;
