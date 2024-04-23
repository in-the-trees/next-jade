import withMDX from "@next/mdx";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import withPWAInit from "@ducanh2912/next-pwa";

if (process.env.NODE_ENV === "development") {
   await setupDevPlatform({
      persist: true,
   });
}

const withPWA = withPWAInit({
   dest: "public",
   fallbacks: {
      document: "/~offline",
   },
   reloadOnOnline: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withMDX()(withPWA(nextConfig));
