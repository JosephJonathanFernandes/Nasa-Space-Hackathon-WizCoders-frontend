import { Link, useLocation } from "react-router-dom";
import { Rocket, Upload, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Navigation bar component with space-themed design
 * Links to Home, Upload, and Chat pages
 */
export const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinkClass = (path: string) =>
    `transition-all duration-300 ${
      isActive(path)
        ? "text-primary font-semibold"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ExoScope
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/upload" className={navLinkClass("/upload")}>
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Find Exoplanets
              </span>
            </Link>
            <Link to="/chat" className={navLinkClass("/chat")}>
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Ask AI
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <img 
              src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" 
              alt="NASA" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
