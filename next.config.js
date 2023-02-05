const nextConfig = () => {
  /** @type {import('next').NextConfig} */
  const config = {
    experimental: {
      appDir: true,
    },
    swcMinify: true,
  };

  return config;
};

module.exports = nextConfig;
