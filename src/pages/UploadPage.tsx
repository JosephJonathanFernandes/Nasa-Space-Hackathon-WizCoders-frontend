import { useState } from "react";
import { UploadSection } from "@/components/upload/UploadSection";
import { AnalysisResult } from "@/components/upload/AnalysisResult";
import { useToast } from "@/hooks/use-toast";

/**
 * Upload page for CSV dataset analysis
 * Handles file upload and displays analysis results
 */
const UploadPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  type AnalysisResults = {
    summary: {
      totalRows: number;
      columns: string[];
      missingValues: number;
    };
    lightCurve: {
      time: number[];
      flux: number[];
    };
    candidates: {
      id: string;
      transitDepth: number;
      period: number;
      confidence: number;
    }[];
    file?: File;
  };

  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);

    // Simulate API call to backend /analyze endpoint
    // Replace with actual fetch to FastAPI backend
    setTimeout(() => {
      // Mock results
      const mockResults = {
        summary: {
          totalRows: 4500,
          columns: ["time", "flux", "flux_err", "quality", "cadence"],
          missingValues: 23,
        },
        lightCurve: {
          time: Array.from({ length: 100 }, (_, i) => i * 0.5),
          flux: Array.from({ length: 100 }, (_, i) => 
            1.0 + Math.sin(i * 0.3) * 0.02 + (Math.random() - 0.5) * 0.01
          ),
        },
        candidates: [
          {
            id: "KIC-12345678",
            transitDepth: 0.245,
            period: 3.52,
            confidence: 0.89,
          },
          {
            id: "KIC-87654321",
            transitDepth: 0.156,
            period: 7.21,
            confidence: 0.76,
          },
        ],
        file: file,
      };

      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: `Found ${mockResults.candidates.length} exoplanet candidates`,
      });
    }, 2500);
  };

  const handleBack = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        {!analysisResults ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold">Upload Dataset</h1>
              <p className="text-xl text-muted-foreground">
                Upload your Kepler or TESS light curve CSV file for AI-powered exoplanet detection
              </p>
            </div>
            <UploadSection onUpload={handleUpload} />
            {isAnalyzing && (
              <div className="text-center">
                <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
                  <div className="h-4 w-4 rounded-full bg-primary animate-pulse-glow" />
                  <span className="text-sm font-medium">Analyzing light curve data...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <AnalysisResult results={analysisResults} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default UploadPage;
