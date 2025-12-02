import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/panel/dobee-do-panel.ts",
      name: "DoBeeDoPanel",
      formats: ["es"],
      fileName: () => "dobee-do-panel.js",
    },
    rollupOptions: {
      output: {
        // Output directly into the Home Assistant /local-served path.
        // When this project is located under <config>/custom_components/dobeedo/frontend,
        // this resolves to <config>/www/dobeedo/dobee-do-panel.js, which matches MODULE_URL
        // in panel.py ("/local/dobeedo/dobee-do-panel.js").
        dir: "../www/dobeedo",
        entryFileNames: "dobee-do-panel.js",
      },
    },
    emptyOutDir: false,
  },
});
