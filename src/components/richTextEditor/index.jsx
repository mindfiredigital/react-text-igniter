import React from "react";
import { EditorProvider } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/rich-text-editor.css";

const RichTextEditor = ({ features,height }) => (
  <EditorProvider>
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor height={height}/>
    </div>
  </EditorProvider>
);

export default RichTextEditor;
