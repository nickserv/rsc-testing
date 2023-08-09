import { screen } from "@testing-library/react";
import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import renderServer from "./renderServer";

const element = createElement("p", {}, "Hello, world!");

describe("renderServer", () => {
	test("sync", async () => {
		await renderServer(element, renderToPipeableStream);
		screen.getByText("Hello, world!");
	});

	test("async", async () => {
		await renderServer(
			createElement(async () => element),
			renderToPipeableStream,
		);
		screen.getByText("Hello, world!");
	});
});
