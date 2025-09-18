import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Themes from "./pages/Themes";
import IdeaAgent from "./pages/IdeaAgent";
import ArchitectAgent from "./pages/ArchitectAgent";
import CodeAgent from "./pages/CodeAgent";
import DocAgent from "./pages/DocAgent";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/idea" element={<IdeaAgent />} />
            <Route path="/architect" element={<ArchitectAgent />} />
            <Route path="/code" element={<CodeAgent />} />
            <Route path="/docs" element={<DocAgent />} />
            <Route path="/team" element={<Team />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
