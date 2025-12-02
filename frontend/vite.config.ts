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
        dir: "../custom_components/dobeedo/www",
        entryFileNames: "dobee-do-panel.js",
      },
    },
  },
});

