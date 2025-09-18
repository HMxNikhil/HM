import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: path.resolve(__dirname, "client"), // Set client/ as Vite root
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        path.resolve(__dirname, "client"), // allow client folder
        path.resolve(__dirname, "shared"), // allow shared folder
        path.resolve(__dirname),           // allow root folder (in case index.html is here)
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),   // @ -> client
      "@shared": path.resolve(__dirname, "shared"), // @shared -> shared
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
/// <reference types="vite/client" />