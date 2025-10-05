import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { LightCurveChart } from "./LightCurveChart";
import { predictExoplanets } from "@/services/api";

/**
 * Analysis results display component
 * Shows dataset summary, light curve visualization, and exoplanet candidates
 */
interface AnalysisResultProps {
  results: {
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
    file?: File; // The uploaded CSV file for prediction
  };
  onBack: () => void;
}

export const AnalysisResult = ({ results, onBack }: AnalysisResultProps) => {
  const [predictions, setPredictions] = useState<Array<{ id: number; transit_depth: number; orbital_period: number; label: string }>>([]);
  const [loadingPred, setLoadingPred] = useState(false);
  const [errorPred, setErrorPred] = useState<string | null>(null);

  useEffect(() => {
    if (results.file) {
      setLoadingPred(true);
      predictExoplanets(results.file)
        .then((data) => {
          // Ensure predictions are in correct format
          if (Array.isArray(data.predictions)) {
            setPredictions(data.predictions);
          } else {
            setPredictions([]);
          }
          setErrorPred(null);
        })
        .catch((e) => {
          setErrorPred(e.message || "Prediction failed");
        })
        .finally(() => setLoadingPred(false));
    }
  }, [results.file]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Analysis Results</h2>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </Button>
      </div>

      {/* Dataset Summary */}
      <Card className="glass border-border/30">
        <CardHeader>
          <CardTitle>Dataset Summary</CardTitle>
          <CardDescription>Overview of uploaded CSV data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Total Rows</p>
              <p className="text-2xl font-bold text-primary">{results.summary.totalRows.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <p className="text-sm text-muted-foreground mb-1">Columns</p>
              <p className="text-2xl font-bold text-secondary">{results.summary.columns.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm text-muted-foreground mb-1">Missing Values</p>
              <p className="text-2xl font-bold text-accent">{results.summary.missingValues}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Column Names:</p>
            <div className="flex flex-wrap gap-2">
              {results.summary.columns.map((col, idx) => (
                <Badge key={idx} variant="outline" className="bg-card/50">
                  {col}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Light Curve Chart */}
      <Card className="glass border-border/30">
        <CardHeader>
          <CardTitle>Light Curve Visualization</CardTitle>
          <CardDescription>Stellar brightness variations over time</CardDescription>
        </CardHeader>
        <CardContent>
          <LightCurveChart data={results.lightCurve} />
        </CardContent>
      </Card>

      {/* Exoplanet Candidates */}
      {/* <Card className="glass border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            Detected Exoplanet Candidates
          </CardTitle>
          <CardDescription>
            AI-identified potential planetary transits
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.candidates.length > 0 ? (
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate ID</TableHead>
                    <TableHead>Transit Depth (%)</TableHead>
                    <TableHead>Orbital Period (days)</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-mono">{candidate.id}</TableCell>
                      <TableCell>{candidate.transitDepth.toFixed(3)}</TableCell>
                      <TableCell>{candidate.period.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${candidate.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm">{(candidate.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            candidate.confidence > 0.8 
                              ? 'bg-secondary/20 text-secondary border-secondary/50 pulse-glow' 
                              : 'bg-primary/20 text-primary border-primary/50'
                          }`}
                        >
                          {candidate.confidence > 0.8 ? 'High Confidence' : 'Candidate'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No exoplanet candidates detected in this dataset</p>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* Prediction Results from /predict */}
      <Card className="glass border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            ML Prediction Results
          </CardTitle>
          <CardDescription>
            Model-predicted exoplanet status for each row
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingPred ? (
            <div className="text-center py-6 text-muted-foreground">Loading predictions...</div>
          ) : errorPred ? (
            <div className="text-center py-6 text-destructive">{errorPred}</div>
          ) : predictions.length > 0 ? (
            <div className="rounded-lg border border-border/50 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Transit Depth</TableHead>
                    <TableHead>Orbital Period</TableHead>
                    <TableHead>Status Label</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions.map((pred) => (
                    <TableRow key={pred.id}>
                      <TableCell className="font-mono">{pred.id}</TableCell>
                      <TableCell>{pred.transit_depth.toFixed(3)}</TableCell>
                      <TableCell>{pred.orbital_period.toFixed(3)}</TableCell>
                      <TableCell>
                        <Badge className={
                          pred.label === "CONFIRMED"
                            ? "bg-yellow-200 text-yellow-900 border-yellow-400 shadow-yellow-400/50 pulse-glow"
                            : pred.label === "CANDIDATE"
                              ? "bg-primary/20 text-primary border-primary/50"
                              : "bg-destructive/20 text-destructive border-destructive/50"
                        }>
                          {pred.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">No predictions available.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};