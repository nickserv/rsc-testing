/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Layout from "./layout";
import Page from "./page";

vi.mock("server-only", () => ({}));

test.each(["client", "server", "layout"])("%s component", async (keyword) => {
	render(
		<Suspense>
			<Layout>
				<Page />
			</Layout>
		</Suspense>,
	);

	await screen.findByText(keyword);
});

test("Having <Layout> here will generate an empty snapshot", async () => {
	const { container } = render(
		<Suspense>
			<Layout>
				<Page />
			</Layout>
		</Suspense>,
	);
	await screen.findByText("server");
	expect(container).toMatchSnapshot();
});

test("Don't using screen here will generate an empty snapshot", async () => {
	const { container } = render(
		<Suspense>
			<Layout>
				<Page />
			</Layout>
		</Suspense>,
	);

	expect(container).toMatchSnapshot();
});

test("Removing the <Layout> tag and calling screen generate a snapshot", async () => {
	const { container } = render(
		<Suspense>
			<Page />
		</Suspense>,
	);
	await screen.findByText("server");
	expect(container).toMatchSnapshot();
});
