import { useState } from "react";

export default function CodeBlock({ code, language = 'bash', filename }: { code: string; language?: string; filename?: string }) {
  const [open, setOpen] = useState(true);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Copied to clipboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-black/50">
        <div className="text-xs text-muted-foreground">{filename ?? language}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen((s) => !s)} className="text-xs text-muted-foreground">{open ? 'Collapse' : 'Expand'}</button>
          <button onClick={onCopy} className="rounded px-2 py-1 bg-white/10 text-xs">Copy Code</button>
        </div>
      </div>
      {open && (
        <pre className="p-4 overflow-auto text-sm text-gray-100">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
