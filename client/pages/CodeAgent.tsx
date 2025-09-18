import CodeBlock from "@/components/CodeBlock";
import ProgressTracker from "@/components/ProgressTracker";
import { useState } from "react";

const frontend = `// App.jsx\nimport React from 'react'\nfunction App(){\n  return <div>Hello World</div>\n}\nexport default App`;
const backend = `// server.js\nimport express from 'express'\nconst app = express()`;
const db = `-- schema.sql\nCREATE TABLE users (id serial primary key, name text);`;

export default function CodeAgent() {
  const [tab, setTab] = useState('frontend');
  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <main className="md:col-span-3 space-y-6">
          <div className="rounded-xl border border-white/10 bg-background/60 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Code Agent</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => setTab('frontend')} className={`px-3 py-1 rounded ${tab==='frontend' ? 'bg-background text-foreground font-semibold' : 'text-muted-foreground'}`}>Frontend</button>
                <button onClick={() => setTab('backend')} className={`px-3 py-1 rounded ${tab==='backend' ? 'bg-background text-foreground font-semibold' : 'text-muted-foreground'}`}>Backend</button>
                <button onClick={() => setTab('db')} className={`px-3 py-1 rounded ${tab==='db' ? 'bg-background text-foreground font-semibold' : 'text-muted-foreground'}`}>Database</button>
              </div>
            </div>
          </div>

          <CodeBlock code={tab==='frontend'?frontend:tab==='backend'?backend:db} filename={tab} />
        </main>

        <aside className="hidden md:block md:col-span-1 space-y-4">
          <div className="rounded-lg border border-white/10 bg-background/60 p-4">
            <h4 className="font-semibold">Quick setup</h4>
            <pre className="mt-3 text-sm text-muted-foreground">npm install && npm run dev</pre>
          </div>

          <ProgressTracker step={3} />
        </aside>
      </div>
    </div>
  );
}
