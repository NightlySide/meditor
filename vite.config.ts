import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			insertTypesEntry: true,
			include: ["lib/main.tsx"],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace("/lib", ""),
				content
			})
		})
	],
	build: {
		lib: {
			entry: resolve("lib", "main.tsx"),
			name: "ReactFeatureFlag",
			fileName: (format) => `meditor.${format}.js`
		},
		rollupOptions: {
			external: ["react"]
		}
	}
});
