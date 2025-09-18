import React, { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}>;

export default function Card({ className = "", title, subtitle, footer, children }: CardProps) {
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-background/60 p-6 ${className}`}>
      {title && (
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="mt-4">{children}</div>

      {footer && <div className="mt-4 border-t border-white/5 pt-4">{footer}</div>}
    </div>
  );
}
