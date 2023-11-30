/** @type {import('next').NextConfig} */

const TerserPlugin = require("terser-webpack-plugin");
const { entities } = require("flowise/dist/database/entities");
const entityNames = Object.values(entities).map((entity) => entity.name);

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // This supresses the Critical dependency: the request of a dependency is an expression error
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    config.resolve.alias.jsdom = false;
    config.resolve.alias["mock-aws-s3"] = false;
    config.resolve.alias["nock"] = false;
    config.resolve.alias["react-native-sqlite-storage"] = false;

    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [
        config.optimization.minimizer[1],
        new TerserPlugin({
          terserOptions: {
            // mangle
            // Regex to match your TypeORM classes so Terser does not change these
            // since TypeORM relies on the actual classname to implement its features
            mangle: {
              reserved: entityNames,
            },
          },
        }),
      ],
    };

    return config;
  },
};

module.exports = nextConfig;
