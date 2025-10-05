import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { uploadFits, uploadZip } from "@/services/apiClient";

/**
 * UploadPage
 * - Upload single FITS to /upload_fits
 * - Upload ZIP to /upload_zip (navigates to /lightcurve-list with returned ids)
 */
const UploadPage: React.FC = () => {
  const [fitsFile, setFitsFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmitFits = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!fitsFile) {
      toast({ title: "No file selected", description: "Please choose a FITS file to upload.", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      await uploadFits(fitsFile);
      toast({ title: "Upload complete", description: `${fitsFile.name} uploaded`, variant: "default" });
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmitZip = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!zipFile) {
      toast({ title: "No file selected", description: "Please choose a ZIP file to upload.", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      const data = await uploadZip(zipFile);
      // Normalize returned ids: either array or { ids: [...] }
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

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass border-border/30">
            <CardHeader>
              <CardTitle>Upload Single FITS</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmitFits} className="space-y-4">
                <input
                  type="file"
                  accept=".fits"
                  onChange={(e) => setFitsFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-muted-foreground"
                />
                <div className="flex gap-2">
                  <Button variant="secondary" type="submit" onClick={onSubmitFits} disabled={isUploading}>
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
              <form onSubmit={onSubmitZip} className="space-y-4">
                <input
                  type="file"
                  accept=".zip"
                  onChange={(e) => setZipFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-muted-foreground"
                />
                <div className="flex gap-2">
                  <Button variant="secondary" type="submit" onClick={onSubmitZip} disabled={isUploading}>
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
  );
};

export default UploadPage;