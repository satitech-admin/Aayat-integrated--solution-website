import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const isPagesBuild = process.env.PAGES_BUILD === "true";
const repositoryName = "Aayat-integrated--solution-website";
const repositoryBase = `/${repositoryName}`;

const nextConfig = {
  turbopack: {
    root: rootDir,
  },
  ...(isPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
        basePath: repositoryBase,
        assetPrefix: repositoryBase,
        images: {
          unoptimized: true,
          formats: ["image/avif", "image/webp"],
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
        },
      }),
  poweredByHeader: false,
};

export default nextConfig;
