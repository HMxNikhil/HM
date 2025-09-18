import { useState } from "react";
import ThemeSidebar from "@/components/ThemeSidebar";
import ThemeCard from "@/components/ThemeCard";

const themes = [
  { id: "carbon", name: "Carbon Tracker", description: "Build an AI model to estimate and reduce carbon footprints for projects." },
  { id: "crop", name: "Smart Crops", description: "Analyze satellite data to optimize crop yields and resource use." },
  { id: "payflow", name: "PayFlow AI", description: "AI-driven payment fraud detection and intelligent reconciliation." },
  { id: "lending", name: "MicroLend", description: "Automate microloan eligibility and risk scoring." },
  { id: "telemed", name: "TeleMed Assist", description: "AI symptom triage and remote monitoring for clinics." },
  { id: "drug", name: "Drug Discovery", description: "Use ML to prioritize candidate molecules and simulate interactions." },
  { id: "learn", name: "Adaptive Learn", description: "Personalized learning paths for students using AI assessments." },
  { id: "mentor", name: "Mentor Match", description: "Match mentors and teams based on skills and project goals." },
];

export default function Themes() {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? themes.filter((t) => t.id.includes(filter) || t.name.toLowerCase().includes(filter)) : themes;

  return (
    <div className="container py-12">
      <div className="rounded-lg border border-white/10 bg-background/60 p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <ThemeSidebar onSelect={(id) => setFilter(id)} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Select a hackathon theme</h2>
              <div className="text-sm text-muted-foreground">Explore themed project ideas and pick one to start building</div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <ThemeCard key={t.id} name={t.name} description={t.description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
