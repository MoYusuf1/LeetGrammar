import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    // inspectAttr plugin only in dev (adds code-path attributes to JSX).
    // Excluded from production builds to avoid Babel dependency issues on Vercel.
    ...(command === 'serve' ? [inspectAttr()] : []),
    react(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    // Force a single copy of React. With pnpm, Vite's dep optimizer can
    // otherwise pre-bundle a second React instance (e.g. via react-router),
    // which breaks hooks at runtime: "Invalid hook call" / "Cannot read
    // properties of null (reading 'useContext')".
    dedupe: ['react', 'react-dom'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Pre-bundle React and its consumers together so they share one instance.
    include: ['react', 'react-dom', 'react-dom/client', 'react-router'],
  },
  /* No manualChunks. There used to be a 'vendor-radix' chunk naming seven
     Radix packages; none of them are dependencies any more, and a manual chunk
     listing a module that does not exist fails the build outright rather than
     being ignored. Rollup's default splitting is fine for an app this size. */
}));
