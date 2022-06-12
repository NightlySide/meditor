import "remirror/styles/all.css";
import { EditorComponent, OnChangeJSON, Remirror } from "@remirror/react";
import { useCallback, useState } from "react";
import { RemirrorJSON } from "remirror";
import useReManager from "./manager";

const STORAGE_KEY = "meditor-editor-content";

const Meditor = () => {
	const { manager, state } = useReManager();

	const [initialContent] = useState<RemirrorJSON | undefined>(() => {
		// Retrieve the JSON from localStorage (or undefined if not found)
		const content = localStorage.getItem(STORAGE_KEY);
		return content ? JSON.parse(content) : undefined;
	});

	const handleEditorChange = useCallback((json: RemirrorJSON) => {
		// Store the JSON in localstorage
		localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
	}, []);

	return (
		<div className="editor-container remirror-theme">
			<Remirror manager={manager} initialContent={state}>
				<OnChangeJSON onChange={handleEditorChange} />
				<EditorComponent />
			</Remirror>
		</div>
	);
};

export default Meditor;
