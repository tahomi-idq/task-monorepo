module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "auth"],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
};
