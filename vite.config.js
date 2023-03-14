/* eslint-disable no-undef */
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        callback: resolve(__dirname, "callback.html"),
        randomizer: resolve(__dirname, "randomizer.html"),
      },
    },
  },
});
