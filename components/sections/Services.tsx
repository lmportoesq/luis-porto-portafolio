"use client";

import { motion } from "framer-motion";
import { Globe, Building2, Zap, LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/animations/StaggerContainer";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Building2,
  Zap,
};

export function Services() {
  return (
    <section id="servicios" className="py-20">
      <SectionHeading subtitle="Servicios" title="Mis Servicios" />
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div key={service.id} variants={staggerItemVariants}>
              <Card
                hover
                className="flex flex-col items-center text-center transition-transform hover:scale-[1.03]"
              >
                {Icon && (
                  <Icon className="h-10 w-10 text-primary mb-4" />
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted text-sm">{service.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
