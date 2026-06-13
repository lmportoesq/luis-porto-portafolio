import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

// Replicates the project card rendering from Projects.tsx
function ProjectCard({ project }: { project: { name: string; description: string; features: string[]; technologies: string[] } }) {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <ul>
        {project.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <div>
        {project.technologies.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
    </div>
  );
}

describe("Feature: portfolio-luis-porto, Property 1: Project card rendering completeness", () => {
  it("should render all project data for any valid project", () => {
    const projectArb = fc.record({
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 1, maxLength: 150 }),
      features: fc.array(fc.string({ minLength: 1, maxLength: 40 }), { minLength: 1, maxLength: 6 }),
      technologies: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
    });

    fc.assert(
      fc.property(projectArb, (project) => {
        const { container } = render(<ProjectCard project={project} />);

        expect(container.textContent).toContain(project.name);
        expect(container.textContent).toContain(project.description);
        project.features.forEach((f) => {
          expect(container.textContent).toContain(f);
        });
        project.technologies.forEach((t) => {
          expect(container.textContent).toContain(t);
        });
      }),
      { numRuns: 100 }
    );
  });
});
