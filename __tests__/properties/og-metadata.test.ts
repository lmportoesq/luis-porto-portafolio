import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
}

function generateOGMetadata(config: SiteConfig) {
  return {
    title: config.title,
    description: config.description,
    url: config.url,
    type: "website" as const,
    images: [{
      url: `${config.url}${config.ogImage}`,
      width: 1200,
      height: 630,
      alt: config.title,
    }],
  };
}

describe("Feature: portfolio-luis-porto, Property 5: Valid Open Graph metadata generation", () => {
  it("should generate valid OG metadata for any valid site config", () => {
    const urlArb = fc.webUrl();
    const configArb = fc.record({
      name: fc.string({ minLength: 1, maxLength: 50 }),
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      url: urlArb,
      ogImage: fc.constant("/images/og-image.png"),
    });

    fc.assert(
      fc.property(configArb, (config) => {
        const og = generateOGMetadata(config);

        expect(og.title).toBe(config.title);
        expect(og.title.length).toBeGreaterThan(0);
        expect(og.description).toBe(config.description);
        expect(og.description.length).toBeGreaterThan(0);
        expect(og.type).toBe("website");
        expect(og.url).toBe(config.url);
        expect(og.images[0].url).toContain("http");
        expect(og.images[0].url).toContain(config.ogImage);
        expect(og.images[0].width).toBe(1200);
        expect(og.images[0].height).toBe(630);
      }),
      { numRuns: 100 }
    );
  });
});
