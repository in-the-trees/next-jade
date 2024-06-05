import withMDX from "@next/mdx";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
   await setupDevPlatform({
      persist: true,
   });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      reactCompiler: true,
      staleTimes: {
         dynamic: 0.5 * 60,
         static: 5 * 60,
      },
   },
};

export default withMDX()(nextConfig);
