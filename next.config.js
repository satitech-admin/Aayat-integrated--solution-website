import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const isPagesBuild = process.env.PAGES_BUILD === "true";
const repositoryName = "Aayat-integrated--solution-website";
const repositoryBase = `/${repositoryName}`;

const nextConfig = {
  ...(isPagesBuild
    ? {
        output: "export",
