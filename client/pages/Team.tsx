import { useState } from "react";

export default function Team() {
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hi team — I can help scaffold your project. What do you want to build?' }]);
  const [text, setText] = useState('');

  const send = () => {
    if (!text) return;
    setMessages((m) => [...m, { from: 'you', text }]);
    setText('');
  };

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-4">
        <aside className="md:col-span-1 hidden md:block">
          <div className="rounded-lg border border-white/10 p-4"> 
            <h4 className="font-semibold">Team Members</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Alice — Frontend</li>
              <li>Bob — Backend</li>
              <li>Carol — ML</li>
            </ul>
          </div>
        </aside>

        <main className="md:col-span-2 space-y-4">
          <div className="rounded-lg border border-white/10 p-4">
            <h3 className="font-semibold">Shared Notes</h3>
            <div className="mt-3 text-sm text-muted-foreground">Use this area to jot down decisions, tasks, and links. (Mock static content)</div>
          </div>

          <div className="rounded-lg border border-white/10 p-4">
            <h3 className="font-semibold">Project Board</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-md bg-background/50 p-3">To do</div>
              <div className="rounded-md bg-background/50 p-3">In progress</div>
            </div>
          </div>
        </main>

        <aside className="md:col-span-1">
          <div className="rounded-lg border border-white/10 p-4 flex flex-col h-full">
            <h4 className="font-semibold">Team Chat</h4>
            <div className="mt-3 flex-1 overflow-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-lg ${m.from==='ai' ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white' : 'bg-background/60 text-muted-foreground'}`}>
                  <div className="text-sm">{m.text}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 rounded-md border border-white/10 px-3 py-2 bg-background/50" placeholder="Message the team" />
              <button onClick={send} className="rounded-md bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] px-3 py-2 text-white">Send</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
