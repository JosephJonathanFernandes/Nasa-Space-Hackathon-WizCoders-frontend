import { useState } from "react";
import { analyzeDataset } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

/**
 * Custom hook for handling dataset upload and analysis
 * Manages upload state and API communication
 */
export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const data = await analyzeDataset(file);
      setResults(data);
      toast({
        title: "Analysis complete",
        description: "Dataset analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to analyze dataset. Please try again.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setResults(null);
  };

  return {
    uploadFile,
    isUploading,
    results,
    reset,
  };
};
