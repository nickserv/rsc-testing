const nextJest = require("next/jest.js");

const createJestConfig = nextJest({ dir: "." });

/** @type {import('jest').Config} */
const config = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/app/setupTests.ts"],
	resetMocks: true,
};

module.exports = createJestConfig(config);
