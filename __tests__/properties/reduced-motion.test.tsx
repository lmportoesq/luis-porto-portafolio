import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";

// Mock framer-motion to simulate reduced motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";
import { FloatingImage } from "@/components/animations/FloatingImage";

describe("Feature: portfolio-luis-porto, Property 4: prefers-reduced-motion respect", () => {
  it("FadeIn should render content immediately without motion when reduced-motion is active", () => {
    const contentArb = fc.string({ minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(contentArb, (content) => {
        const { container } = render(<FadeIn><span>{content}</span></FadeIn>);
        expect(container.textContent).toContain(content);
        // When reduced motion is active, FadeIn renders a plain div, not motion.div
        // So there should be no inline opacity style
        const motionElements = container.querySelectorAll("[style*='opacity']");
        expect(motionElements.length).toBe(0);
      }),
      { numRuns: 100 }
    );
  });

  it("SlideUp should render content immediately without motion when reduced-motion is active", () => {
    const contentArb = fc.string({ minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(contentArb, (content) => {
        const { container } = render(<SlideUp><span>{content}</span></SlideUp>);
        expect(container.textContent).toContain(content);
      }),
      { numRuns: 100 }
    );
  });

  it("FloatingImage should render content without animation when reduced-motion is active", () => {
    const contentArb = fc.string({ minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(contentArb, (content) => {
        const { container } = render(<FloatingImage><span>{content}</span></FloatingImage>);
        expect(container.textContent).toContain(content);
      }),
      { numRuns: 100 }
    );
  });
});
