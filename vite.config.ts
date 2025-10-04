import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::", // allows access from all network interfaces
    port: 8080, // local dev server port
  },
  plugins: [
    react(), // React plugin for Vite
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // shorthand for imports
    },
  },
});