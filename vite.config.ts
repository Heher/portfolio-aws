import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { remixDevTools } from 'remix-development-tools/vite';

installGlobals();

export default defineConfig({
  // plugins: [remixDevTools(), remix(), tsconfigPaths()]
  server: {
    // host: '127.0.0.1',
    port: 3000
    // hmr: {
    //   clientPort: 443
    // }
  },
  plugins: [
    remix({ serverModuleFormat: 'esm', ignoredRouteFiles: ['**/.*'] }),
    tsconfigPaths(),
    sentryVitePlugin({
      org: "heher",
      project: "john-heher"
    })
  ],
  optimizeDeps: { esbuildOptions: { target: 'esnext' } },
  build: {
    // rollupOptions: {
    //   external: ['@sentry/browser']
    // }
    target: 'ES2022',

    sourcemap: true
  }
});