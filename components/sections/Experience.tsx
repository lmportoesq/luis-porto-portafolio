"use client";

import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export function Experience() {
  return (
    <section id="experiencia" className="py-20 px-4 w-full">
      <SectionHeading subtitle="Trayectoria" title="Experiencia" />
      <FadeIn>
        <ol
          aria-label="Experiencia profesional"
          className="relative border-l-2 border-primary ml-4 max-w-3xl mx-auto"
        >
          {experience.map((entry) => (
            <li key={entry.id} className="ml-6 mb-10 last:mb-0">
              <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <span className="text-sm text-primary font-medium">
                {entry.period}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {entry.title}
              </h3>
              <p className="text-base text-muted">{entry.company}</p>
              <p className="text-sm text-muted mt-2">{entry.description}</p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
