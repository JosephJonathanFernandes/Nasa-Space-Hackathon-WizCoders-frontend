import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getLightcurve, vetExoplanets } from "@/services/apiClient";

/**
 * LightcurveListPage
 * - Receives { ids: string[] } via location.state from the ZIP upload flow
 * - Displays a lazy scrollable list and fetches details on click
 * - "Vet Exoplanets" floating button calls /vet_exoplanets and navigates to /analysis-results
 */
const LightcurveListPage: React.FC = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  interface LocationState {
    ids?: string[];
  }
  const passed = (loc.state as LocationState) || {};
  const ids: string[] = useMemo(() => passed.ids ?? [], [passed.ids]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<{ imageSrc?: string; metadata?: Record<string, unknown> } | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [fetchingVet, setFetchingVet] = useState(false);

  useEffect(() => {
    if (!ids.length) {
      // If no ids were passed, redirect back to upload page
      toast({ title: "No IDs", description: "No Kepler/TESS IDs were provided. Upload a ZIP first.", variant: "destructive" });
    }
  }, [ids, toast]);

  const onClickId = async (id: string) => {
    setSelectedId(id);
    setLoadingDetail(true);
    setDetail(null);
    try {
      const data = await getLightcurve(id);
      setDetail(data);
    } catch (err) {
      toast({ title: "Fetch failed", description: String(err), variant: "destructive" });
    } finally {
      setLoadingDetail(false);
    }
  };

  const onVet = async () => {
    setFetchingVet(true);
    try {
      const parsed = await vetExoplanets();
      // parsed === { headers: string[], rows: Record<string,string>[] }
      navigate("/analysis-results", { state: { csv: parsed } });
    } catch (err) {
      toast({ title: "Vetting failed", description: String(err), variant: "destructive" });
    } finally {
      setFetchingVet(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="md:grid md:grid-cols-3 gap-6">
          {/* ID list */}
          <div className="md:col-span-1">
            <Card className="glass border-border/30 h-[70vh] overflow-y-auto p-2">
              <CardHeader>
                <CardTitle>Lightcurve IDs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {ids.length ? (
                  ids.map((id) => (
                    <div
                      key={id}
                      onClick={() => onClickId(id)}
                      className={`p-3 rounded-md cursor-pointer transition transform hover:scale-[1.01] ${
                        id === selectedId ? "ring-2 ring-primary" : "hover:shadow-lg"
                      }`}
                      title={`Open ${id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-sm">{id}</div>
                        <div className="text-xs text-muted-foreground">Open</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No IDs provided. Upload a ZIP first.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detail panel */}
          <div className="md:col-span-2">
            <Card className="glass border-border/30 h-[70vh] overflow-auto">
              <CardHeader>
                <CardTitle>Lightcurve Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {loadingDetail ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse text-muted-foreground">Loading lightcurve...</div>
                  </div>
                ) : detail ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <div className="bg-card p-2 rounded-md">
                        <img src={detail.imageSrc} alt={selectedId ?? "lightcurve"} className="w-full h-auto rounded" />
                      </div>
                    </div>
                    <div className="md:col-span-1 space-y-2">
                      <h4 className="font-semibold">Metadata</h4>
                      <pre className="text-xs text-muted-foreground bg-background/30 p-3 rounded overflow-auto">
                        {JSON.stringify(detail.metadata ?? {}, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">Select an ID to view its lightcurve and metadata.</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Vet Exoplanets floating button */}
      <div className="fixed right-6 bottom-6 z-50">
        <Button className="glow" onClick={onVet} disabled={fetchingVet}>
          {fetchingVet ? "Vetting..." : "Vet Exoplanets"}
        </Button>
      </div>
    </div>
  );
};

export default LightcurveListPage;