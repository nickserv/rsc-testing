const nextJest = require("next/jest.js");

const createJestConfig = nextJest({ dir: "." });

/** @type {import('jest').Config} */
const config = {
	testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);
