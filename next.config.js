/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "https://gnacklxdugptumvlqnda.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
