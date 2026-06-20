import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "miconsultorio",
    name: "MiConsultorio",
    description: "Sistema de gestión médica integral para consultorios",
    features: [
      "Agenda médica",
      "Gestión de pacientes",
      "Historia clínica",
      "Control de citas",
    ],
    technologies: ["Next.js", "PostgreSQL", "Supabase"],
    demoUrl: "https://miconsultorio.demo.com",
  },
  {
    id: "rinas-gallos",
    name: "Sistema de Riñas de Gallos",
    description: "Plataforma de administración de eventos y estadísticas",
    features: [
      "Gestión de ejemplares",
      "Programación de peleas",
      "Estadísticas",
      "Reportes",
    ],
    technologies: ["Next.js", "PostgreSQL"],
    demoVideo: "/PortoVal_Demo.mp4",
  },
  {
    id: "porto-soluciones",
    name: "Porto Soluciones",
    description: "Sitio corporativo con landing optimizada para captación",
    features: [
      "Landing corporativa",
      "Captación de clientes",
      "SEO optimizado",
    ],
    technologies: ["Next.js", "Tailwind CSS"],
  },
];
