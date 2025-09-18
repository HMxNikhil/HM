import { useState } from "react";
import { BookOpen, Globe, Heart, DollarSign } from "lucide-react";

const categories = [
  { id: "climate", name: "AI for Climate Change", icon: Globe },
  { id: "fintech", name: "FinTech", icon: DollarSign },
  { id: "health", name: "Healthcare", icon: Heart },
  { id: "education", name: "Education", icon: BookOpen },
];

export default function ThemeSidebar({ onSelect }: { onSelect?: (id: string) => void }) {
  const [active, setActive] = useState<string>(categories[0].id);

  return (
    <aside className="w-full md:w-64">
      <div className="sticky top-24 space-y-4">
        <h4 className="px-3 text-sm font-semibold text-muted-foreground">Categories</h4>
        <div className="flex flex-col gap-2 px-2">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActive(c.id);
                  onSelect?.(c.id);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-left transition-colors ${
                  isActive ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white" : "text-muted-foreground hover:bg-background/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
