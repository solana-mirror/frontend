/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["solana-mirror"],
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**"
          }
        ]
      }
};

export default nextConfig;
