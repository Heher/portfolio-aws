import { sentryVitePlugin } from '@sentry/vite-plugin';
import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import fs from 'fs';
// import caddyTls from 'vite-plugin-caddy';
// import { remixDevTools } from 'remix-development-tools/vite';

installGlobals();

export default defineConfig({
  // server: {
  //   host: '127.0.0.1',
  //   port: 3000
  // hmr: {
  //   clientPort: 443
  // }
  // },
  // server: {
  // https: {
  //   key: fs.readFileSync('./key.pem'),
  //   cert: fs.readFileSync('./cert.pem')
  // },
  // host: true,
  // port: 3000,
  // strictPort: true,
  // hmr: {
  //   clientPort: 443
  // }
  // },
  plugins: [
    remix({ serverModuleFormat: 'esm', ignoredRouteFiles: ['**/.*'] }),
    tsconfigPaths(),
    sentryVitePlugin({
      org: 'heher',
      project: 'john-heher'
    })
    // caddyTls({
    //   domains: ['johnheher.dev']
    // })
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
