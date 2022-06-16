import {
	BoldExtension,
	ItalicExtension,
	CalloutExtension,
	MarkdownExtension,
	StrikeExtension,
	UnderlineExtension,
	CodeExtension
} from "remirror/extensions";
import { useRemirror } from "@remirror/react";
import { useState, useCallback } from "react";
import { RemirrorJSON } from "remirror";

const STORAGE_KEY = "meditor-editor-content";

export const useManager = () => {
	return useRemirror({
		extensions: () => [
			new BoldExtension(),
			new ItalicExtension(),
			new StrikeExtension(),
			new UnderlineExtension(),
			new CodeExtension(),
			new CalloutExtension({ defaultType: "warn" }),
			new MarkdownExtension()
		],

		// Set the initial content.
		content: "<p>I love <b>Remirror</b></p>",

		// Place the cursor at the start of the document. This can also be set to
		// `end`, `all` or a numbered position.
		selection: "start",

		// Set the string handler which means the content provided will be
		// automatically handled as html.
		// `markdown` is also available when the `MarkdownExtension`
		// is added to the editor.
		stringHandler: "markdown"
	});
};

export const useInitialContent = () => {
	const [initialContent] = useState<RemirrorJSON | undefined>(() => {
		// Retrieve the JSON from localStorage (or undefined if not found)
		const content = localStorage.getItem(STORAGE_KEY);
		return content ? JSON.parse(content) : undefined;
	});

	return initialContent;
};

export const useEditorChangeHandler = () => {
	return useCallback((json: RemirrorJSON) => {
		// Store the JSON in localstorage
		localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
	}, []);
};
