import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-24 md:py-32 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-14 max-w-3xl">
          {eyebrow && (
            <p className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.3em] bg-[oklch(0.38_0.27_295)] text-white px-1.5 py-px">{eyebrow}</p>
          )}
          {title && (
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-5 text-lg text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
