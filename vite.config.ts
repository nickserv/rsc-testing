import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";

export default {
	plugins: [react()],
	test: {
		include: ["app/test.tsx"],
		globals: true,
		environment: "jsdom",
	},
} satisfies UserConfig;
