/** @type {import('next').NextConfig} */
const nextConfig = {
  //assetPrefix: "/next-market",
  //assetPrefix: ",",
  assetPrefix: "/next-market",
  //basePath: "/next-market",
  //reactStrictMode: true,

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
