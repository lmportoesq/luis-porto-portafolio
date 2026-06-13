import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";

function TechItem({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-14 w-14 rounded-full bg-primary/15" />
      <span>{name}</span>
    </div>
  );
}

describe("Feature: portfolio-luis-porto, Property 2: Technology name rendering", () => {
  it("should display the technology name as visible text for any valid technology", () => {
    const techArb = fc.record({
      name: fc.string({ minLength: 1, maxLength: 30 }),
      icon: fc.string({ minLength: 1, maxLength: 20 }),
    });

    fc.assert(
      fc.property(techArb, (tech) => {
        const { container } = render(<TechItem name={tech.name} />);
        expect(container.textContent).toContain(tech.name);
      }),
      { numRuns: 100 }
    );
  });
});
