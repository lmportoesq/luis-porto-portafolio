"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  StaggerContainer,
  staggerItemVariants,
} from "@/components/animations/StaggerContainer";
import { ExternalLink, X, Play } from "lucide-react";

export function Projects() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading subtitle="Portafolio" title="Proyectos Destacados" />

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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

              <div className="flex items-center gap-2 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-sm font-medium hover:bg-red-500 transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Ver demo
                  </a>
                )}
                {project.demoVideo && (
                  <button
                    onClick={() => setVideoSrc(project.demoVideo!)}
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-sm font-medium hover:bg-red-500 transition-colors flex-shrink-0"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Ver demo
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>

      {/* Video Modal */}
      {videoSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setVideoSrc(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoSrc(null)}
              className="absolute -top-10 right-0 text-white hover:text-muted transition-colors"
              aria-label="Cerrar video"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              src={videoSrc}
              autoPlay
              controls
              className="w-full rounded-xl shadow-2xl"
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
