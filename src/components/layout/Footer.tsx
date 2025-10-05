import { Github, Globe, Telescope } from "lucide-react";

/**
 * Footer component with credits and resource links
 */
export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/30 glass">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">ExoScope</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered exoplanet detection platform using NASA Kepler and TESS mission data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://exoplanetarchive.ipac.caltech.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Telescope className="h-4 w-4" />
                NASA Exoplanet Archive
              </a>
              <a
                href="https://www.nasa.gov/kepler"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
                Kepler Mission
              </a>
              <a
                href="https://tess.mit.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
                TESS Mission
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Developed for NASA Space Apps Global Hackathon
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>© 2025 ExoScope. Built for exploring the cosmos.</p>
        </div>
      </div>
    </footer>
  );
};
