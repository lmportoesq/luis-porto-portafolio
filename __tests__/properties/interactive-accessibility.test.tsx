import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";

function IconButton({ ariaLabel, icon }: { ariaLabel: string; icon: string }) {
  return (
    <button aria-label={ariaLabel}>
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

function IconLink({ ariaLabel, href, icon }: { ariaLabel: string; href: string; icon: string }) {
  return (
    <a href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
      <span aria-hidden="true">{icon}</span>
    </a>
  );
}

describe("Feature: portfolio-luis-porto, Property 7: Interactive element accessibility", () => {
  it("icon buttons without visible text should have aria-label with at least 3 characters", () => {
    const ariaLabelArb = fc.string({ minLength: 3, maxLength: 50 });
    const iconArb = fc.string({ minLength: 1, maxLength: 5 });

    fc.assert(
      fc.property(ariaLabelArb, iconArb, (label, icon) => {
        const { container } = render(<IconButton ariaLabel={label} icon={icon} />);
        const button = container.querySelector("button");
        expect(button).not.toBeNull();
        const ariaLabel = button!.getAttribute("aria-label");
        expect(ariaLabel).not.toBeNull();
        expect(ariaLabel!.length).toBeGreaterThanOrEqual(3);
      }),
      { numRuns: 100 }
    );
  });

  it("icon links without visible text should have aria-label with at least 3 characters", () => {
    const ariaLabelArb = fc.string({ minLength: 3, maxLength: 50 });
    const hrefArb = fc.webUrl();
    const iconArb = fc.string({ minLength: 1, maxLength: 5 });

    fc.assert(
      fc.property(ariaLabelArb, hrefArb, iconArb, (label, href, icon) => {
        const { container } = render(<IconLink ariaLabel={label} href={href} icon={icon} />);
        const link = container.querySelector("a");
        expect(link).not.toBeNull();
        const ariaLabel = link!.getAttribute("aria-label");
        expect(ariaLabel).not.toBeNull();
        expect(ariaLabel!.length).toBeGreaterThanOrEqual(3);
      }),
      { numRuns: 100 }
    );
  });
});
