/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_URL: "https://rescue.trulynk.org",
    NEXTAUTH_SECRET: "Vx4GgzAwkhQXxwL3r3a0rcbxgF63Rmp2ke11yd5K8dY=",
  },
  images: {
    domains: ["trulynk.s3.ap-south-1.amazonaws.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/rescue-group",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
