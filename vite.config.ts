import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()], // Disabled componentTagger (lovable) - was printing scorecard JSX "157/7" to terminal causing WSOD
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
