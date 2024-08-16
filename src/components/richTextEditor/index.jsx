import React from "react";
import { EditorProvider } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/rich-text-editor.css";

const RichTextEditor = ({ features }) => (
  <EditorProvider>
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor />
    </div>
  </EditorProvider>
);

export default RichTextEditor;
