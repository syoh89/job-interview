/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surface / background
        surface: "hsl(var(--surface, 0 0% 100%) / <alpha-value>)",
        "surface-muted": "hsl(var(--surface-muted, 210 40% 98%) / <alpha-value>)",
        "surface-elevated": "hsl(var(--surface-elevated, 0 0% 100%) / <alpha-value>)",

        // Text
        "text-primary": "hsl(var(--text-primary, 222 47% 11%) / <alpha-value>)",
        "text-muted": "hsl(var(--text-muted, 215 16% 47%) / <alpha-value>)",

        // Accent
        accent: "hsl(var(--accent, 174 83% 28%) / <alpha-value>)",
        "accent-soft": "hsl(var(--accent-soft, 167 79% 90%) / <alpha-value>)",

        // Borders / separators
        "border-subtle": "hsl(var(--border-subtle, 214 32% 91%) / <alpha-value>)",

        // Code / inline elements
        "code-bg": "hsl(var(--code-bg, 222 47% 11%) / <alpha-value>)",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "var(--radius-card, 0.75rem)",
        tag: "var(--radius-pill, 999px)",
      },
      boxShadow: {
        card: "var(--shadow-card, 0 12px 30px hsl(220 40% 2% / 0.08))",
        "card-soft": "var(--shadow-card-soft, 0 6px 16px hsl(220 40% 2% / 0.06))",
      },
      typography: {
        til: {
          css: {
            "--tw-prose-body": "theme('colors.text-primary')",
            "--tw-prose-headings": "theme('colors.text-primary')",
            "--tw-prose-lead": "theme('colors.text-muted')",
            "--tw-prose-links": "theme('colors.accent')",
            "--tw-prose-bold": "theme('colors.text-primary')",
            "--tw-prose-counters": "theme('colors.text-muted')",
            "--tw-prose-bullets": "theme('colors.text-muted')",
            "--tw-prose-hr": "theme('colors.border-subtle')",
            "--tw-prose-quotes": "theme('colors.text-primary')",
            "--tw-prose-quote-borders": "theme('colors.border-subtle')",
            "--tw-prose-captions": "theme('colors.text-muted')",
            "--tw-prose-code": "theme('colors.text-primary')",
            "--tw-prose-pre-bg": "theme('colors.code-bg')",
            "--tw-prose-pre-border": "theme('colors.border-subtle')",
            "--tw-prose-th-borders": "theme('colors.border-subtle')",
            "--tw-prose-td-borders": "theme('colors.border-subtle')",
            "--tw-prose-invert-body": "theme('colors.text-primary')",

            a: {
              textDecoration: "none",
              fontWeight: "500",
              color: "theme('colors.accent')",
            },
            "a:hover": {
              textDecoration: "underline",
            },
            h1: {
              fontFamily: "theme('fontFamily.heading')",
              fontWeight: "700",
            },
            h2: {
              fontFamily: "theme('fontFamily.heading')",
              fontWeight: "700",
            },
            h3: {
              fontFamily: "theme('fontFamily.heading')",
              fontWeight: "600",
            },
            code: {
              fontFamily: "theme('fontFamily.mono')",
              fontSize: "0.9em",
              padding: "0.15rem 0.35rem",
              borderRadius: "0.375rem",
              backgroundColor: "theme('colors.surface-muted')",
            },
            "pre code": {
              padding: "0",
              borderRadius: "0",
              backgroundColor: "transparent",
            },
            pre: {
              fontFamily: "theme('fontFamily.mono')",
              borderRadius: "0.75rem",
              borderWidth: "1px",
              borderColor: "theme('colors.border-subtle')",
              padding: "1rem 1.25rem",
            },
            blockquote: {
              fontStyle: "normal",
              borderLeftColor: "theme('colors.border-subtle')",
              color: "theme('colors.text-muted')",
            },
            "ul > li::marker": {
              color: "theme('colors.text-muted')",
            },
            "ol > li::marker": {
              color: "theme('colors.text-muted')",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
