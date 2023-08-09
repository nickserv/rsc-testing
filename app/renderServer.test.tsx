import { screen } from "@testing-library/react";
import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import renderServer from "./renderServer";

describe("renderServer", () => {
	test("sync", async () => {
		await renderServer(<p>Hello, world!</p>, renderToPipeableStream);
		screen.getByText("Hello, world!");
	});

	test("async", async () => {
		await renderServer(
			createElement(async () => <p>Hello, world!</p>),
			renderToPipeableStream,
		);
		screen.getByText("Hello, world!");
	});
});
