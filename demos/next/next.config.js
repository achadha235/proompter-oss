/** @type {import('next').NextConfig} */

const TerserPlugin = require("terser-webpack-plugin");

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // This supresses the annoying Critical dependency: the request of a dependency is an expression
    // error
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // Regex to match your TypeORM classes so Terser does not change these
            // since TypeORM relies on the actual classname to implement its features
            keep_classnames: /^(ChatFlow|ChatMessage|Credential|Tool)$/,
          },
        }),
      ],
    };

    return config;
  },
};

module.exports = nextConfig;
