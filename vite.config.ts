import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { remixDevTools } from 'remix-development-tools/vite';

installGlobals();

export default defineConfig({
  // plugins: [remixDevTools(), remix(), tsconfigPaths()]
  server: {
    port: 3000
  },
  plugins: [remix({ serverModuleFormat: 'esm', ignoredRouteFiles: ['**/.*'] }), tsconfigPaths()],
  optimizeDeps: { esbuildOptions: { target: 'esnext' } },
  build: {
    target: 'ES2022'
    // rollupOptions: {
    //   external: ['@sentry/browser']
    // }
  }
});
