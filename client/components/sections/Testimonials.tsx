export default function Testimonials() {
  const items = [
    {
      name: "Maya Patel",
      role: "Hackathon Winner, DevCon",
      quote:
        "We shipped a full-stack AI app in 24 hours. The Architect + Code agents felt like an elite teammate.",
    },
    {
      name: "Liam Chen",
      role: "Startup Founder",
      quote:
        "Idea Agent helped us scope a razor-sharp MVP. The momentum boost was unreal.",
    },
    {
      name: "Sofia Rodriguez",
      role: "ML Engineer",
      quote:
        "Clean UI, smart defaults, and incredible speed. It elevated our team's collaboration instantly.",
    },
  ];

  return (
    <section id="testimonials" className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold">What makers are saying</h2>
        <p className="mt-3 text-muted-foreground">Real teams. Real wins. Faster innovation.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <figure
            key={i}
            className="relative rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur"
          >
            <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] opacity-20 blur" />
            <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="text-muted-foreground"> • {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
