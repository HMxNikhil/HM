import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[800px] w-[1200px] rounded-full bg-gradient-to-r from-[hsl(var(--primary)/0.25)] to-[hsl(var(--accent)/0.25)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[hsl(var(--accent)/0.2)] to-transparent blur-3xl" />
      </div>
      <div className="container py-24 md:py-32 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--accent))]" /> Built for hackathons
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">AI Hackathon Hub</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
          Your AI-powered teammate for faster innovation
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white shadow-xl shadow-[rgba(124,58,237,0.25)] hover:opacity-90"
          >
            <a href="#agents">Start Hackathon</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6">
            <a href="#agents">Explore Agents <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
