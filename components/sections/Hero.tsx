"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, User, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FloatingImage } from "@/components/animations/FloatingImage";

export function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Photo column - shown first on mobile */}
          <div className="order-1 lg:order-2 flex-shrink-0">
            <div className="relative">
              <FloatingImage amplitude={10} duration={3}>
                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px]">
                  <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(79,70,229,0.3)] border-2 border-primary/30" />
                  {imageError ? (
                    <div
                      className="rounded-full w-full h-full relative z-10 bg-card flex items-center justify-center border border-border"
                      role="img"
                      aria-label="Fotografía profesional de Luis Porto"
                    >
                      <User className="w-24 h-24 text-primary/60" />
                    </div>
                  ) : (
                    <Image
                      src="/images/luis-porto.jpg"
                      alt="Fotografía profesional de Luis Porto"
                      width={400}
                      height={400}
                      className="rounded-full object-cover w-full h-full relative z-10"
                      priority
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              </FloatingImage>

              {/* Overlay presentation card */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-2 sm:right-[-2rem] z-20 bg-card/90 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-lg">
                <p className="text-sm font-semibold text-foreground">Luis Porto</p>
                <p className="text-xs text-muted">Full Stack Developer</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted">Colombia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="order-2 lg:order-1 flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Luis Porto
            </h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">
              Full Stack Developer &amp; Founder of Porto Soluciones
            </p>
            <p className="text-base sm:text-lg text-muted max-w-lg mx-auto lg:mx-0 mb-8">
              Creo aplicaciones web modernas, sistemas empresariales y soluciones
              digitales escalables para empresas y emprendedores
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <Button variant="primary" size="md" href="#proyectos">
                Ver Proyectos
              </Button>
              <Button variant="ghost" size="md" href={siteConfig.whatsappUrl} external>
                <MessageCircle className="mr-2 h-4 w-4" />
                Contáctame
              </Button>
            </div>

            {/* Technology badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <Badge>Next.js</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Supabase</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
