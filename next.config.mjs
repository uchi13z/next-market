const nextConfig = {
  assetPrefix: "/next-market",
  //  basePath: "/next-market",
  //  reactStrictMode: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
