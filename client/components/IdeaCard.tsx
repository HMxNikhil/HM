export default function IdeaCard({ title, description, feasibility }: { title: string; description: string; feasibility: 'Low' | 'Medium' | 'High' | string }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-background/60 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${feasibility === 'High' ? 'bg-green-100 text-green-800' : feasibility === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{feasibility}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <button className="rounded-md bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] px-3 py-2 text-sm text-white shadow">Select Idea</button>
        <button className="text-sm text-muted-foreground underline">Details</button>
      </div>
    </div>
  );
}
