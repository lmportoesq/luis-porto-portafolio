"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutMe() {
  return (
    <section id="sobre-mi" className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <SectionHeading
            subtitle="Sobre Mí"
            title="Transformando ideas en soluciones digitales"
          />
          <p className="text-lg leading-relaxed text-muted text-center">
            Soy desarrollador Full Stack y fundador de Porto Soluciones. Me
            especializo en el desarrollo de aplicaciones web modernas,
            automatización de procesos empresariales y plataformas SaaS
            utilizando tecnologías como Next.js, TypeScript, PostgreSQL y
            Supabase. Mi enfoque se centra en crear software escalable, intuitivo
            y orientado a resultados.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
