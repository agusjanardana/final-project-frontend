import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readdirSync } from "fs";
import path from "path";

// https://stackoverflow.com/questions/69424422/use-compileroptions-baseurl-with-vite-js-project
const absolutePathAliases = {};
// Root resources folder
const srcPath = path.resolve("./src/");
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, {
  withFileTypes: true,
}).map((dirent) => dirent.name.replace(/(\.js){1}(x?)/, ""));

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  alias: {
    ...absolutePathAliases,
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
