import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, MessageSquare, Sparkles } from "lucide-react";

/**
 * Hero section with animated planet and call-to-action
 */
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                NASA Space Apps Hackathon 2025
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hunting for
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Exoplanets
              </span>
              with AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Discover distant worlds using machine learning and NASA's Kepler & TESS mission data. 
              Analyze light curves and detect planetary transits with unprecedented accuracy.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/upload">
                <Button size="lg" className="gap-2 glow">
                  Find Exoplanets
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="secondary" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Animated Planet */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="relative w-80 h-80 animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-rotate-slow" />
              <div className="absolute inset-4 rounded-full bg-background/90" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-primary/10 to-primary/30" />
              
              {/* Rings */}
              <div className="absolute -inset-8 border-2 border-primary/20 rounded-full" />
              <div className="absolute -inset-16 border border-primary/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
