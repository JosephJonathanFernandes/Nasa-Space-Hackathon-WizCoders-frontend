import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadSection } from "@/components/upload/UploadSection";
import { AnalysisResult } from "@/components/upload/AnalysisResult";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadFits, uploadZip } from "@/services/apiClient";

/**
 * Upload page for CSV dataset analysis
 * Handles file upload and displays analysis results
 */
const UploadPage = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fitsFile, setFitsFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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

  /**
   * Upload a single FITS file to the backend using the apiClient helper
   */
  const handleUploadFits = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!fitsFile) {
      toast({ title: "No file selected", description: "Please choose a FITS file to upload.", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      // Optionally call uploadFits if you want to upload before analysis
      await uploadFits(fitsFile);
      toast({ title: "Upload complete", description: `${fitsFile.name} uploaded`, variant: "default" });
      // Immediately show analysis result page with the FITS file
      setAnalysisResults({
        summary: {
          totalRows: 0,
          columns: [],
          missingValues: 0,
        },
        lightCurve: {
          time: [],
          flux: [],
        },
        candidates: [],
        file: fitsFile,
      });
      setFitsFile(null);
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Upload a ZIP file; on success the backend should return an array of IDs
   * which we navigate to /lightcurve-list with via location.state
   */
  const handleUploadZip = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!zipFile) {
      toast({ title: "No file selected", description: "Please choose a ZIP file to upload.", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadZip(zipFile);
      const ids: string[] = Array.isArray(data) ? data : Array.isArray(data.ids) ? data.ids : [];
      if (!ids.length) {
        toast({ title: "No IDs returned", description: "Backend did not return any Kepler/TESS IDs.", variant: "destructive" });
      } else {
        toast({ title: "Upload complete", description: `Received ${ids.length} IDs. Opening list...` });
        navigate("/lightcurve-list", { state: { ids } });
      }
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleBack = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        {!analysisResults ? (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold">Upload Dataset</h1>
              <p className="text-xl text-muted-foreground">
                Upload your Kepler or TESS light curve CSV file, or FITS/ZIP files for batch processing
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* CSV Upload - existing */}
              <div className="md:col-span-2">
                <UploadSection onUpload={handleUpload} />
                {isAnalyzing && (
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full">
                      <div className="h-4 w-4 rounded-full bg-primary animate-pulse-glow" />
                      <span className="text-sm font-medium">Analyzing light curve data...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* FITS / ZIP Upload options */}
              <div className="md:col-span-1 space-y-4">
                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle>Upload Single FITS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUploadFits} className="space-y-4">
                      <input
                        type="file"
                        accept=".fits"
                        onChange={(e) => setFitsFile(e.target.files?.[0] ?? null)}
                        className="block w-full text-sm text-muted-foreground"
                      />
                      <div className="flex gap-2">
                        <Button variant="secondary" type="submit" onClick={handleUploadFits} disabled={isUploading}>
                          {isUploading ? "Uploading..." : "Choose FITS File & Upload"}
                        </Button>
                        <Button variant="ghost" onClick={() => setFitsFile(null)}>
                          Clear
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle>Upload ZIP (multiple FITS)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUploadZip} className="space-y-4">
                      <input
                        type="file"
                        accept=".zip"
                        onChange={(e) => setZipFile(e.target.files?.[0] ?? null)}
                        className="block w-full text-sm text-muted-foreground"
                      />
                      <div className="flex gap-2">
                        <Button variant="secondary" type="submit" onClick={handleUploadZip} disabled={isUploading}>
                          {isUploading ? "Uploading..." : "Choose ZIP & Upload"}
                        </Button>
                        <Button variant="ghost" onClick={() => setZipFile(null)}>
                          Clear
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Upload a ZIP containing multiple FITS files. Backend will return a list of Kepler/TESS IDs.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <AnalysisResult results={analysisResults} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default UploadPage;