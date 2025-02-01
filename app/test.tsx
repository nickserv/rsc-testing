/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Layout from "./layout";
import Page from "./page";

vi.mock("server-only", () => ({}));

test.fails.each(["client", "server", "layout"])(
	"%s component",
	async (keyword) => {
		render(
			<Suspense>
				<Layout>
					<Page />
				</Layout>
			</Suspense>,
		);

		await screen.findByText(keyword);
	},
);
