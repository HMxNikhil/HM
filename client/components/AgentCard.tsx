import { PropsWithChildren, ReactNode } from "react";

interface AgentCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function AgentCard({ title, description, icon }: PropsWithChildren<AgentCardProps>) {
  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] opacity-30 blur transition duration-500 group-hover:opacity-60" />
      <div className="relative rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white shadow-lg">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
