"use client";

import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/data/site";

export function CTAFinal() {
  return (
    <section id="contacto" className="py-20 px-4">
      <FadeIn>
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary to-secondary p-10 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Estoy disponible para ayudarte a construir soluciones digitales modernas y escalables
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href={siteConfig.whatsappUrl}
              variant="secondary"
              size="lg"
              external
              className="bg-white text-primary hover:bg-white/90"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contactar por WhatsApp
            </Button>
            <Button
              href={`mailto:${siteConfig.email}`}
              variant="ghost"
              size="lg"
              className="text-white border border-white/30 hover:bg-white/10"
            >
              <Mail className="mr-2 h-5 w-5" />
              Enviar correo
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
