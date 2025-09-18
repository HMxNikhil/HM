import { Outlet, NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(1200px_600px_at_50%_-200px,rgba(124,58,237,0.15),transparent),radial-gradient(800px_400px_at_80%_0,rgba(59,130,246,0.15),transparent)]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
          AI Hackathon Hub
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <NavLink to="/" className={({isActive}) => `hover:text-foreground transition-colors ${isActive? 'text-foreground font-semibold':''}`} end>Home</NavLink>
          <NavLink to="/themes" className={({isActive}) => `hover:text-foreground transition-colors ${isActive? 'text-foreground font-semibold':''}`}>Hackathons</NavLink>
          <NavLink to="/team" className={({isActive}) => `hover:text-foreground transition-colors ${isActive? 'text-foreground font-semibold':''}`}>Teams</NavLink>
          <NavLink to="/docs" className={({isActive}) => `hover:text-foreground transition-colors ${isActive? 'text-foreground font-semibold':''}`}>Docs</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white shadow-lg shadow-[rgba(124,58,237,0.2)] hover:opacity-90"
          >
            <Link to="/themes">Start Hackathon</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="container py-12 grid gap-8 md:grid-cols-3 items-center">
        <div>
          <div className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">AI Hackathon Hub</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Your AI-powered teammate for faster innovation at every hackathon.
          </p>
        </div>
        <div className="md:justify-self-center">
          <h3 className="text-sm font-semibold text-foreground/80">Contact</h3>
          <a href="mailto:contact@aihackathonhub.com" className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Mail className="h-4 w-4" /> contact@aihackathonhub.com
          </a>
        </div>
        <div className="md:justify-self-end">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} AI Hackathon Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
