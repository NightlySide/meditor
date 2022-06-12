import "remirror/styles/core.css";
import "remirror/styles/components.css";
import "remirror/styles/extension-positioner.css";
import "./theme.css";
import "./main.css";

import { EditorComponent, OnChangeJSON, Remirror } from "@remirror/react";
import { useManager, useEditorChangeHandler, useInitialContent } from "./manager";
import { BubbleMenu } from "./bubble_menu";

const Meditor = () => {
	const { manager, state } = useManager();

	const initialContent = useInitialContent();
	const handleEditorChange = useEditorChangeHandler();

	return (
		<div className="editor-container">
			<div className="remirror-theme">
				<Remirror manager={manager} initialContent={initialContent ? initialContent : state}>
					<OnChangeJSON onChange={handleEditorChange} />
					<EditorComponent />
					<BubbleMenu />
				</Remirror>
			</div>
		</div>
	);
};

export default Meditor;
