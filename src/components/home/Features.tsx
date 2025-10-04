import { Brain, LineChart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Features section highlighting key capabilities
 */
export const Features = () => {
  const features = [
    {
      icon: LineChart,
      title: "Light Curve Analysis",
      description: "Upload CSV datasets and visualize stellar brightness variations over time to identify planetary transits.",
      gradient: "from-primary to-primary/50"
    },
    {
      icon: Brain,
      title: "AI Detection Model",
      description: "Trained machine learning model automatically identifies exoplanet candidates with high accuracy.",
      gradient: "from-secondary to-secondary/50"
    },
    {
      icon: MessageCircle,
      title: "Research Assistant",
      description: "Ask questions about your data and get intelligent insights from our RAG-powered AI chatbot.",
      gradient: "from-accent to-accent/50"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Advanced Exoplanet Detection Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge AI and NASA mission data to expand our understanding of distant planetary systems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
