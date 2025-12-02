import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Build a single entry point bundle instead of library mode to avoid
    // top-level exports that Home Assistant cannot execute when loaded as
    // a plain script via _panel_custom/js_url.
    rollupOptions: {
      input: "src/panel/dobee-do-panel.ts",
      output: {
        dir: "../custom_components/dobeedo/www",
        entryFileNames: "dobee-do-panel.js",
        format: "iife",
        name: "DoBeeDoPanelBundle",
      },
    },
    emptyOutDir: false,
  },
});
