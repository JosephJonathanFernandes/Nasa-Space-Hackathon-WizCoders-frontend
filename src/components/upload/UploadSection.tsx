import { useCallback, useState } from "react";
import { Upload, FileUp, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * CSV file upload component with drag-and-drop support
 * @param onUpload - Callback when file is uploaded successfully
 */
interface UploadSectionProps {
  onUpload: (file: File) => void;
}

export const UploadSection = ({ onUpload }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      toast({
        title: "Upload started",
        description: `Analyzing ${selectedFile.name}...`,
      });
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  return (
    <Card className="glass border-border/30 hover:border-primary/30 transition-all">
      <CardContent className="p-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all
            ${isDragging 
              ? 'border-primary bg-primary/10' 
              : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
            }
          `}
        >
          {!selectedFile ? (
            <>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drop your CSV file here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse
                  </p>
                </div>
                <label htmlFor="file-upload">
                  <Button variant="secondary" className="cursor-pointer" asChild>
                    <span>
                      <FileUp className="h-4 w-4 mr-2" />
                      Select File
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                Supports CSV files from Kepler and TESS missions (max 50MB)
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-secondary/10">
                <FileUp className="h-12 w-12 text-secondary" />
              </div>
              <div className="bg-card/50 rounded-lg p-4 w-full max-w-md">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemove}
                    className="ml-4"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button size="lg" onClick={handleUpload} className="glow">
                <Upload className="h-5 w-5 mr-2" />
                Analyze Dataset
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
