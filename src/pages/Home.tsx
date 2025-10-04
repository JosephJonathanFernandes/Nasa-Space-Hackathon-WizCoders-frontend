import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";

/**
 * Home page with hero section and feature highlights
 */
const Home = () => {
  return (
    <div className="relative">
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
