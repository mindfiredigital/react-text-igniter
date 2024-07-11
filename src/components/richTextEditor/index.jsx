import React from "react";
import { EditorProvider } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/rich-text-editor.css";

/**
 * RichTextEditor Component
 *
 * This is the main component that combines the Toolbar and Editor components.
 * It wraps these components with the EditorProvider to share editor state and functionality.
 *
 * @param {Object} props
 * @param {Array} props.features - An array of feature names to be displayed in the toolbar
 */
const RichTextEditor = ({ features }) => (
  <EditorProvider>
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor />
    </div>
  </EditorProvider>
);

export default RichTextEditor;
