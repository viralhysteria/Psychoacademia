/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
