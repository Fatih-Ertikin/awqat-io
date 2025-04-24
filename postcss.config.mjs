const config = {
  plugins: {
    // Tailwind CSS plugin for postcss
    "@tailwindcss/postcss": {},

    // Mantine PostCSS preset for Mantine's theme system
    "postcss-preset-mantine": {},

    // Simple variable definitions (for Mantine variables)
    "postcss-simple-vars": {
      variables: {
        // Define custom Mantine CSS variables
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",

        // Add other Mantine variables here if necessary
        "mantine-primary-color": "#3498db", // Example primary color
        "mantine-secondary-color": "#2ecc71", // Example secondary color
        "mantine-font-family": '"Roboto", sans-serif', // Example font family
        "mantine-shadow-xs": "0 1px 2px rgba(0, 0, 0, 0.1)", // Example shadow
      },
    },

    // You can add any other PostCSS plugins as needed
  },
};

export default config;
