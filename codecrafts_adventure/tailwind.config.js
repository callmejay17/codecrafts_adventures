/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-700 */
        input: "var(--color-input)", /* surface-color */
        ring: "var(--color-ring)", /* primary-green */
        background: "var(--color-background)", /* deep-charcoal */
        foreground: "var(--color-foreground)", /* light-gray */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-forest-green */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* rich-brown */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* clear-error-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-700 */
          foreground: "var(--color-muted-foreground)", /* muted-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* classic-gold */
          foreground: "var(--color-accent-foreground)", /* deep-charcoal */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* surface-color */
          foreground: "var(--color-popover-foreground)", /* light-gray */
        },
        card: {
          DEFAULT: "var(--color-card)", /* surface-color */
          foreground: "var(--color-card-foreground)", /* light-gray */
        },
        success: {
          DEFAULT: "var(--color-success)", /* standard-success-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-orange */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* clear-error-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "2px",
        md: "2px",
        sm: "1px",
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
        'code': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'pixel-xs': ['8px', { lineHeight: '12px' }],
        'pixel-sm': ['10px', { lineHeight: '16px' }],
        'pixel-base': ['12px', { lineHeight: '20px' }],
        'pixel-lg': ['14px', { lineHeight: '24px' }],
        'pixel-xl': ['16px', { lineHeight: '28px' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pixel-bounce": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "quest-glow": {
          "0%, 100%": { boxShadow: "0 0 4px var(--color-accent)" },
          "50%": { boxShadow: "0 0 8px var(--color-accent)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pixel-bounce": "pixel-bounce 1s infinite",
        "quest-glow": "quest-glow 2s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        'hud': '100',
        'dropdown': '200',
        'modal': '300',
        'alert': '400',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}