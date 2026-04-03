import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.GRAPHQL_API_URL || 'http://127.0.0.1:3001/graphql',
      },
    ];
  },
};

export default nextConfig;
