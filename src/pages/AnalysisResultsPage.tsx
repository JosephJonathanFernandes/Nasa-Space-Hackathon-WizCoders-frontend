import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * AnalysisResultsPage
 * - Reads parsed CSV from location.state
 * - Displays results in a Tailwind-styled table with subtle animation
 */
const AnalysisResultsPage: React.FC = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const parsed = (loc.state as any)?.csv;
  const headers: string[] = parsed?.headers ?? [];
  const rows: Record<string, string>[] = parsed?.rows ?? [];

  if (!parsed) {
    return (
      <div className="min-h-screen pt-24 pb-12 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">No analysis results available.</p>
            <div className="mt-4">
              <Button onClick={() => nav("/lightcurve-list")}>Back to List</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Vetting Results</h2>
          <div>
            <Button variant="ghost" onClick={() => nav("/lightcurve-list")}>
              Back to List
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto bg-card rounded-lg border border-border/30 p-4 animate-fade-in">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h} className="text-left text-sm text-muted-foreground p-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition transform hover:scale-[1.005] even:bg-background/30"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  {headers.map((h) => (
                    <td key={h} className="p-2 text-sm">
                      {row[h]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultsPage;