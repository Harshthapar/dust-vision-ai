import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScanOverlay from "./ScanOverlay";
import AnalysisResults from "./AnalysisResults";

interface AnalysisData {
  invalid: boolean;
  type?: "Demolition" | "Excavation" | "Construction";
  score?: number;
  solutions?: string[];
}

const UploadAnalyzer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      const { data, error: fnError } = await supabase.functions.invoke("analyze-site", {
        body: { image: base64, mimeType: file.type },
      });

      if (fnError) throw fnError;
      setResult(data as AnalysisData);
    } catch (err: any) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <section id="analyzer" className="relative px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-6 sm:p-8 glow-emerald"
        >
          <h2 className="text-xl font-bold text-foreground mb-1">Live Site Analyzer</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Upload a construction site photo for instant AI analysis
          </p>

          {!image ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-medium mb-1">Drop image here or click to upload</p>
              <p className="text-muted-foreground text-xs">PNG, JPG up to 10MB</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Uploaded site"
                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                />
                <AnimatePresence>{analyzing && <ScanOverlay />}</AnimatePresence>

                {!analyzing && (
                  <button
                    onClick={reset}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>
                )}
              </div>

              {!result && !analyzing && (
                <button
                  onClick={analyze}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Analyze Site
                </button>
              )}

              {analyzing && (
                <div className="flex items-center justify-center gap-3 py-3 text-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-mono text-sm">Scanning image...</span>
                </div>
              )}

              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}

              <AnimatePresence>
                {result && <AnalysisResults data={result} image={image ?? undefined} />}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default UploadAnalyzer;
