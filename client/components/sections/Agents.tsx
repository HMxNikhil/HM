import AgentCard from "@/components/AgentCard";
import { Brain, Boxes, Code2 } from "lucide-react";

export default function Agents() {
  return (
    <section id="agents" className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Collaborate with specialized AI agents</h2>
        <p className="mt-3 text-muted-foreground">From brainstorming to architecture to shipping code — move faster with focus.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <AgentCard
          title="Idea Agent"
          description="Generate and refine winning hackathon ideas with market fit and feasibility insights."
          icon={<Brain className="h-6 w-6" />}
        />
        <AgentCard
          title="Architect Agent"
          description="Design robust systems, choose the right stack, and model data for rapid iteration."
          icon={<Boxes className="h-6 w-6" />}
        />
        <AgentCard
          title="Code Agent"
          description="Scaffold apps, write features, and fix bugs with production-grade code suggestions."
          icon={<Code2 className="h-6 w-6" />}
        />
      </div>
    </section>
  );
}
