import { Eye } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-foreground tracking-tight">DustVision <span className="text-primary">AI</span></span>
        </div>
        <a
          href="#analyzer"
          className="text-sm font-medium text-primary-foreground bg-primary px-4 py-2 rounded-lg hover:brightness-110 transition-all"
        >
          Try Analyzer
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
