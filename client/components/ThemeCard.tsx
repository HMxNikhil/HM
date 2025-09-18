import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  description: string;
}

export default function ThemeCard({ name, description }: Props) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="group relative rounded-xl border border-white/10 bg-background/70 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button
            onClick={() => setSelected((s) => !s)}
            size="sm"
            variant={selected ? "secondary" : "default"}
            className={selected ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white" : ""}
          >
            {selected ? "Selected" : "Select Theme"}
          </Button>
          <span className="text-xs text-muted-foreground">{selected ? "Ready to use" : "Click to choose"}</span>
        </div>
      </div>
    </div>
  );
}
