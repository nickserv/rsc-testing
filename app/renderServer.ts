import {
	getQueriesForElement,
	queries,
	render,
	screen,
} from "@testing-library/react";
import type ReactDOMServer from "react-dom/server";
import { Writable } from "stream";

async function pipeableStreamToString(stream: ReactDOMServer.PipeableStream) {
	// Uses code from @jasnell https://github.com/nodejs/node/blob/main/lib/stream/consumers.js
	const dec = new TextDecoder();
	let str = "";
	return new Promise<string>((resolve, reject) => {
		stream.pipe(
			new Writable({
				write(chunk, encoding, callback) {
					if (typeof chunk === "string") str += chunk;
					else str += dec.decode(chunk, { stream: true });
					callback();
				},
				final(callback) {
					if (this.errored) reject(this.errored);
					else {
						// Flush the streaming TextDecoder so that any pending incomplete multibyte characters are handled.
						str += dec.decode(undefined, { stream: false });
						resolve(str);
					}
					callback(this.errored);
				},
			}),
		);
	});
}

export default async function renderServer(
	ui: React.ReactElement,
	renderToPipeableStream: (typeof ReactDOMServer)["renderToPipeableStream"],
) {
	document.write(await pipeableStreamToString(renderToPipeableStream(ui)));
	for (const [key, value] of Object.entries(
		getQueriesForElement(document.body, queries),
	)) {
		screen[key] = value;
	}
	return render(ui, { container: document.body, hydrate: true });
}
