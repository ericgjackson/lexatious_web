/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const tsConfig = fs.readFileSync(path.resolve(__dirname, 'tsconfig.json'), 'utf-8');
const tsConfigJson = JSON.parse(tsConfig);
const tsConfigAliases = Object.keys(tsConfigJson.compilerOptions.paths).reduce(
  (result, key) => ({
    ...result,
    [key]: path.resolve(__dirname, tsConfigJson.compilerOptions.paths[key][0]),
  }),
  {},
);

module.exports = {
  compress: false,
  devIndicators: {
    buildActivity: false,
  },
  reactStrictMode: true,
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...tsConfigAliases,
      },
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.svg$/,
          issuer: /\.tsx?$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      ...config.plugins,
    ].filter(Boolean),
  }),
};
