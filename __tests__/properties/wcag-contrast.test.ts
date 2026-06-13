import { describe, it, expect } from "vitest";

// Calculate relative luminance per WCAG 2.1
function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error(`Invalid hex color: ${hex}`);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Feature: portfolio-luis-porto, Property 6: WCAG color contrast", () => {
  const theme = {
    background: "#0B0F19",
    foreground: "#FFFFFF",
    card: "#111827",
    primary: "#4F46E5",
    secondary: "#7C3AED",
    muted: "#9CA3AF",
  };

  // Text/background pairs that must meet 4.5:1
  const textPairs: [string, string, string][] = [
    ["foreground on background", theme.foreground, theme.background],
    ["foreground on card", theme.foreground, theme.card],
    ["muted on background", theme.muted, theme.background],
    ["muted on card", theme.muted, theme.card],
  ];

  textPairs.forEach(([name, text, bg]) => {
    it(`${name} should have contrast ratio >= 4.5:1`, () => {
      const ratio = contrastRatio(text, bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  // Large text (headings) can have 3:1 minimum
  const largeTextPairs: [string, string, string][] = [
    ["primary on background (large text)", theme.primary, theme.background],
    ["secondary on background (large text)", theme.secondary, theme.background],
  ];

  largeTextPairs.forEach(([name, text, bg]) => {
    it(`${name} should have contrast ratio >= 3:1`, () => {
      const ratio = contrastRatio(text, bg);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });
  });
});
