import { defineConfig, UserConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react() as UserConfig["plugins"]],
	test: {
		include: ["app/test.tsx"],
		globals: true,
		environment: "jsdom",
	},
});
