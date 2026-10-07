import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { "/api": "http://127.0.0.1:4188" } },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id))
            return "react-core";
          if (
            /node_modules\/(three|@react-three\/fiber|react-reconciler)\//.test(
              id,
            )
          )
            return "three-scene";
        },
      },
    },
  },
});
