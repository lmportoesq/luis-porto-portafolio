"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/animations/StaggerContainer";

export function Projects() {
  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading subtitle="Portafolio" title="Proyectos Destacados" />

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItemVariants}
              className="group relative rounded-xl bg-card/80 backdrop-blur-md border border-border/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">
                {project.name}
              </h3>

              <p className="text-muted text-sm mb-4">
                {project.description}
              </p>

              <ul className="space-y-1 mb-4">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-muted flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
