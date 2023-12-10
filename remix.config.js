// import { withEsbuildOverride } from 'remix-esbuild-override';
// import { glsl } from 'esbuild-plugin-glsl';

// withEsbuildOverride((option, { isServer, isDev }) => {
//   // update the option
//   option.plugins = [
//     glsl({
//       minify: true
//     }),
//     ...option.plugins
//   ];

//   return option;
// });

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*']
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
