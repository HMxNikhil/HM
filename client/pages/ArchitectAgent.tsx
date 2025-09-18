import ProgressTracker from "@/components/ProgressTracker";

export default function ArchitectAgent() {
  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <main className="md:col-span-3 space-y-6">
          <div className="rounded-xl border border-white/10 bg-background/60 p-6">
            <h2 className="text-2xl font-bold">Architect Agent</h2>
            <p className="mt-2 text-sm text-muted-foreground">Design decisions, recommended tech stack, and system flow for your selected idea.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-background/60 p-6">
              <h3 className="font-semibold">Recommended Tech Stack</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Frontend: React + Tailwind</li>
                <li>Backend: Node + Express</li>
                <li>Database: Postgres</li>
                <li>AI: LangChain + OpenAI</li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-background/60 p-6">
              <h3 className="font-semibold">Scalable Design Notes</h3>
              <p className="mt-3 text-sm text-muted-foreground">Use stateless services, containerize components, and add autoscaling for inference nodes.</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-background/60 p-6">
            <h3 className="font-semibold">System Diagram</h3>
            <div className="mt-4 h-72 rounded-md border border-dashed border-white/10 bg-background/30 flex items-center justify-center text-sm text-muted-foreground">Mermaid diagram placeholder</div>
          </div>
        </main>

        <aside className="hidden md:block md:col-span-1 space-y-4">
          <div className="rounded-lg border border-white/10 bg-background/60 p-4">
            <h4 className="font-semibold">Selected Idea</h4>
            <p className="mt-2 text-sm text-muted-foreground">AutoCrop AI — Smart crop recommendations with satellite imagery.</p>
          </div>

          <div>
            <button className="w-full rounded-md bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] px-4 py-2 text-white">Proceed to Code Agent</button>
          </div>

          <ProgressTracker step={2} />
        </aside>
      </div>
    </div>
  );
}
