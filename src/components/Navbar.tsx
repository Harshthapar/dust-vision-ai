import { Eye, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#analyzer", label: "Analyzer" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#trends", label: "Trends" },
  { href: "#map", label: "Map" },
  { href: "#sustainability", label: "Sustainability" },
  { href: "#about", label: "About" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-foreground tracking-tight">
            DustVision <span className="text-primary">AI</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
          <a
            href="#analyzer"
            className="text-sm font-medium text-primary-foreground bg-primary px-4 py-2 rounded-lg hover:brightness-110 transition-all"
          >
            Try Analyzer
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
