import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(process.cwd());
const inputPath = path.join(rootDir, "design", "design-tokens.json");
const outputPath = path.join(rootDir, "src", "app", "design-tokens.css");

const hexToHsl = (hex) => {
  const sanitized = hex.replace("#", "");
  const full =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitized;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  const round = (value) => Math.round(value * 100) / 100;
  return `${round(h)} ${round(s * 100)}% ${round(l * 100)}%`;
};

const toHsl = (value) => {
  if (!value) return null;
  if (value.startsWith("#")) return hexToHsl(value);
  return value;
};

const pick = (obj, pathSegments) =>
  pathSegments.reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);

const getValue = (tokens, pathString) => {
  const value = pick(tokens, pathString.split("."));
  return value?.value ?? null;
};

const buildEntries = (tokens, mappings) =>
  mappings
    .map((mapping) => {
      const raw = getValue(tokens, mapping.path);
      if (!raw) return null;
      const value = mapping.transform === "hsl" ? toHsl(raw) : raw;
      return [mapping.var, value];
    })
    .filter(Boolean);

const main = async () => {
  const raw = await readFile(inputPath, "utf8");
  const tokens = JSON.parse(raw);

  const lightMappings = [
    { var: "--surface", path: "basic.colors.semantic.light.bg", transform: "hsl" },
    { var: "--surface-muted", path: "basic.colors.gray.100", transform: "hsl" },
    { var: "--surface-elevated", path: "basic.colors.semantic.light.card", transform: "hsl" },
    { var: "--text-primary", path: "basic.colors.semantic.light.textPrimary", transform: "hsl" },
    { var: "--text-muted", path: "basic.colors.semantic.light.textSecondary", transform: "hsl" },
    { var: "--accent", path: "basic.colors.semantic.light.link", transform: "hsl" },
    { var: "--accent-soft", path: "basic.colors.primary.100", transform: "hsl" },
    { var: "--border-subtle", path: "basic.colors.semantic.light.border", transform: "hsl" },
    { var: "--code-bg", path: "basic.components.codeBlock.light.bg", transform: "hsl" },
    { var: "--code-text", path: "basic.components.codeBlock.light.text", transform: "hsl" },
    { var: "--code-border", path: "basic.components.codeBlock.light.border", transform: "hsl" },
    { var: "--shadow-card", path: "basic.shadow.md", transform: "raw" },
    { var: "--shadow-card-soft", path: "basic.shadow.sm", transform: "raw" },
    { var: "--radius-card", path: "basic.borderRadius.lg", transform: "raw" },
    { var: "--radius-pill", path: "basic.borderRadius.full", transform: "raw" },
    { var: "--font-body", path: "basic.typography.fontFamily.sans", transform: "raw" },
    { var: "--font-heading", path: "basic.typography.fontFamily.sans", transform: "raw" },
    { var: "--font-mono", path: "basic.typography.fontFamily.mono", transform: "raw" },
    { var: "--card-bg", path: "basic.components.card.default.light.bg", transform: "hsl" },
    {
      var: "--card-border",
      path: "basic.components.card.default.light.border",
      transform: "hsl",
    },
    {
      var: "--card-radius",
      path: "basic.components.card.default.light.borderRadius",
      transform: "raw",
    },
    {
      var: "--card-padding",
      path: "basic.components.card.default.light.padding",
      transform: "raw",
    },
    {
      var: "--card-shadow",
      path: "basic.components.card.default.light.shadow",
      transform: "raw",
    },
    {
      var: "--card-elevated-shadow",
      path: "basic.components.card.elevated.shadow",
      transform: "raw",
    },
    {
      var: "--card-elevated-shadow-hover",
      path: "basic.components.card.elevated.shadowHover",
      transform: "raw",
    },
    {
      var: "--badge-easy-bg",
      path: "basic.components.badge.difficulty.easy.light.bg",
      transform: "hsl",
    },
    {
      var: "--badge-easy-text",
      path: "basic.components.badge.difficulty.easy.light.text",
      transform: "hsl",
    },
    {
      var: "--badge-easy-border",
      path: "basic.components.badge.difficulty.easy.light.border",
      transform: "hsl",
    },
    {
      var: "--badge-medium-bg",
      path: "basic.components.badge.difficulty.medium.light.bg",
      transform: "hsl",
    },
    {
      var: "--badge-medium-text",
      path: "basic.components.badge.difficulty.medium.light.text",
      transform: "hsl",
    },
    {
      var: "--badge-medium-border",
      path: "basic.components.badge.difficulty.medium.light.border",
      transform: "hsl",
    },
    {
      var: "--badge-hard-bg",
      path: "basic.components.badge.difficulty.hard.light.bg",
      transform: "hsl",
    },
    {
      var: "--badge-hard-text",
      path: "basic.components.badge.difficulty.hard.light.text",
      transform: "hsl",
    },
    {
      var: "--badge-hard-border",
      path: "basic.components.badge.difficulty.hard.light.border",
      transform: "hsl",
    },
    {
      var: "--modal-backdrop",
      path: "basic.components.modal.backdrop",
      transform: "raw",
    },
    { var: "--modal-bg", path: "basic.components.modal.light.bg", transform: "hsl" },
    { var: "--modal-text", path: "basic.components.modal.light.text", transform: "hsl" },
    { var: "--modal-radius", path: "basic.components.modal.borderRadius", transform: "raw" },
    { var: "--modal-padding", path: "basic.components.modal.padding", transform: "raw" },
    { var: "--modal-max-width", path: "basic.components.modal.maxWidth", transform: "raw" },
    { var: "--btn-primary-bg", path: "basic.components.button.primary.light.bg", transform: "hsl" },
    {
      var: "--btn-primary-bg-hover",
      path: "basic.components.button.primary.light.bgHover",
      transform: "hsl",
    },
    {
      var: "--btn-primary-bg-active",
      path: "basic.components.button.primary.light.bgActive",
      transform: "hsl",
    },
    {
      var: "--btn-primary-text",
      path: "basic.components.button.primary.light.text",
      transform: "hsl",
    },
    {
      var: "--btn-primary-radius",
      path: "basic.components.button.primary.light.borderRadius",
      transform: "raw",
    },
    {
      var: "--btn-primary-padding-x",
      path: "basic.components.button.primary.light.paddingX",
      transform: "raw",
    },
    {
      var: "--btn-primary-padding-y",
      path: "basic.components.button.primary.light.paddingY",
      transform: "raw",
    },
    {
      var: "--btn-primary-font-weight",
      path: "basic.components.button.primary.light.fontWeight",
      transform: "raw",
    },
    {
      var: "--btn-secondary-bg",
      path: "basic.components.button.secondary.light.bg",
      transform: "hsl",
    },
    {
      var: "--btn-secondary-bg-hover",
      path: "basic.components.button.secondary.light.bgHover",
      transform: "hsl",
    },
    {
      var: "--btn-secondary-text",
      path: "basic.components.button.secondary.light.text",
      transform: "hsl",
    },
    { var: "--input-bg", path: "basic.components.input.light.bg", transform: "hsl" },
    { var: "--input-border", path: "basic.components.input.light.border", transform: "hsl" },
    {
      var: "--input-border-focus",
      path: "basic.components.input.light.borderFocus",
      transform: "hsl",
    },
    { var: "--input-text", path: "basic.components.input.light.text", transform: "hsl" },
    {
      var: "--input-placeholder",
      path: "basic.components.input.light.placeholder",
      transform: "hsl",
    },
    { var: "--input-radius", path: "basic.components.input.borderRadius", transform: "raw" },
    { var: "--input-padding-x", path: "basic.components.input.paddingX", transform: "raw" },
    { var: "--input-padding-y", path: "basic.components.input.paddingY", transform: "raw" },
    { var: "--tab-active-bg", path: "basic.colors.semantic.light.card", transform: "hsl" },
    { var: "--tab-active-text", path: "basic.colors.semantic.light.textPrimary", transform: "hsl" },
    { var: "--tab-active-border", path: "basic.colors.semantic.light.link", transform: "hsl" },
    {
      var: "--tab-inactive-text",
      path: "basic.colors.semantic.light.textSecondary",
      transform: "hsl",
    },
    { var: "--tab-inactive-border", path: "basic.colors.semantic.light.border", transform: "hsl" },
    { var: "--tab-hover-border", path: "basic.colors.semantic.light.linkHover", transform: "hsl" },
    {
      var: "--pagination-bg",
      path: "basic.components.button.secondary.light.bg",
      transform: "hsl",
    },
    {
      var: "--pagination-bg-hover",
      path: "basic.components.button.secondary.light.bgHover",
      transform: "hsl",
    },
    {
      var: "--pagination-text",
      path: "basic.components.button.secondary.light.text",
      transform: "hsl",
    },
    { var: "--alert-success-bg", path: "basic.colors.success.100", transform: "hsl" },
    { var: "--alert-success-text", path: "basic.colors.success.600", transform: "hsl" },
    { var: "--alert-success-border", path: "basic.colors.success.300", transform: "hsl" },
    { var: "--alert-warning-bg", path: "basic.colors.warning.100", transform: "hsl" },
    { var: "--alert-warning-text", path: "basic.colors.warning.600", transform: "hsl" },
    { var: "--alert-warning-border", path: "basic.colors.warning.700", transform: "hsl" },
    { var: "--alert-error-bg", path: "basic.colors.error.100", transform: "hsl" },
    { var: "--alert-error-text", path: "basic.colors.error.600", transform: "hsl" },
    { var: "--alert-error-border", path: "basic.colors.error.700", transform: "hsl" },
  ];

  const darkMappings = [
    { var: "--surface", path: "basic.colors.semantic.dark.bg", transform: "hsl" },
    { var: "--surface-muted", path: "basic.colors.semantic.dark.card", transform: "hsl" },
    { var: "--surface-elevated", path: "basic.colors.semantic.dark.card", transform: "hsl" },
    { var: "--text-primary", path: "basic.colors.semantic.dark.textPrimary", transform: "hsl" },
    { var: "--text-muted", path: "basic.colors.semantic.dark.textSecondary", transform: "hsl" },
    { var: "--accent", path: "basic.colors.semantic.dark.link", transform: "hsl" },
    { var: "--accent-soft", path: "basic.colors.primary.900", transform: "hsl" },
    { var: "--border-subtle", path: "basic.colors.semantic.dark.border", transform: "hsl" },
    { var: "--code-bg", path: "basic.components.codeBlock.dark.bg", transform: "hsl" },
    { var: "--code-text", path: "basic.components.codeBlock.dark.text", transform: "hsl" },
    { var: "--code-border", path: "basic.components.codeBlock.dark.border", transform: "hsl" },
    { var: "--card-bg", path: "basic.components.card.default.dark.bg", transform: "hsl" },
    { var: "--card-border", path: "basic.components.card.default.dark.border", transform: "hsl" },
    { var: "--modal-bg", path: "basic.components.modal.dark.bg", transform: "hsl" },
    { var: "--modal-text", path: "basic.components.modal.dark.text", transform: "hsl" },
    { var: "--btn-primary-bg", path: "basic.components.button.primary.dark.bg", transform: "hsl" },
    {
      var: "--btn-primary-bg-hover",
      path: "basic.components.button.primary.dark.bgHover",
      transform: "hsl",
    },
    {
      var: "--btn-primary-bg-active",
      path: "basic.components.button.primary.dark.bgActive",
      transform: "hsl",
    },
    {
      var: "--btn-primary-text",
      path: "basic.components.button.primary.dark.text",
      transform: "hsl",
    },
    {
      var: "--btn-secondary-bg",
      path: "basic.components.button.secondary.dark.bg",
      transform: "hsl",
    },
    {
      var: "--btn-secondary-bg-hover",
      path: "basic.components.button.secondary.dark.bgHover",
      transform: "hsl",
    },
    {
      var: "--btn-secondary-text",
      path: "basic.components.button.secondary.dark.text",
      transform: "hsl",
    },
    { var: "--input-bg", path: "basic.components.input.dark.bg", transform: "hsl" },
    { var: "--input-border", path: "basic.components.input.dark.border", transform: "hsl" },
    {
      var: "--input-border-focus",
      path: "basic.components.input.dark.borderFocus",
      transform: "hsl",
    },
    { var: "--input-text", path: "basic.components.input.dark.text", transform: "hsl" },
    {
      var: "--input-placeholder",
      path: "basic.components.input.dark.placeholder",
      transform: "hsl",
    },
    { var: "--tab-active-bg", path: "basic.colors.semantic.dark.card", transform: "hsl" },
    { var: "--tab-active-text", path: "basic.colors.semantic.dark.textPrimary", transform: "hsl" },
    { var: "--tab-active-border", path: "basic.colors.semantic.dark.link", transform: "hsl" },
    {
      var: "--tab-inactive-text",
      path: "basic.colors.semantic.dark.textSecondary",
      transform: "hsl",
    },
    { var: "--tab-inactive-border", path: "basic.colors.semantic.dark.border", transform: "hsl" },
    { var: "--tab-hover-border", path: "basic.colors.semantic.dark.linkHover", transform: "hsl" },
    { var: "--pagination-bg", path: "basic.components.button.secondary.dark.bg", transform: "hsl" },
    {
      var: "--pagination-bg-hover",
      path: "basic.components.button.secondary.dark.bgHover",
      transform: "hsl",
    },
    {
      var: "--pagination-text",
      path: "basic.components.button.secondary.dark.text",
      transform: "hsl",
    },
    { var: "--alert-success-bg", path: "basic.colors.success.700", transform: "hsl" },
    { var: "--alert-success-text", path: "basic.colors.success.100", transform: "hsl" },
    { var: "--alert-success-border", path: "basic.colors.success.600", transform: "hsl" },
    { var: "--alert-warning-bg", path: "basic.colors.warning.700", transform: "hsl" },
    { var: "--alert-warning-text", path: "basic.colors.warning.100", transform: "hsl" },
    { var: "--alert-warning-border", path: "basic.colors.warning.600", transform: "hsl" },
    { var: "--alert-error-bg", path: "basic.colors.error.700", transform: "hsl" },
    { var: "--alert-error-text", path: "basic.colors.error.100", transform: "hsl" },
    { var: "--alert-error-border", path: "basic.colors.error.600", transform: "hsl" },
  ];

  const vars = buildEntries(tokens, lightMappings);
  const darkVars = buildEntries(tokens, darkMappings);

  const toLines = (entries) =>
    entries
      .filter(([, value]) => value)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join("\n");

  const css = `/* Generated from design/design-tokens.json. Do not edit manually. */
:root {
${toLines(vars)}
}

[data-theme="dark"] {
${toLines(darkVars)}
}
`;

  await writeFile(outputPath, css, "utf8");
  console.log(`Generated ${path.relative(rootDir, outputPath)}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
