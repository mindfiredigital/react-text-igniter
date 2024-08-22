// index.jsx

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { EditorProvider, useEditor } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/rich-text-editor.css";

const RichTextEditorContent = forwardRef(({ features, height }, ref) => {
  const { getHtml, getJson } = useEditor();

  useImperativeHandle(ref, () => ({
    getHtml,
    getJson
  }));

  return (
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor height={height}/>
    </div>
  );
});

const RichTextEditor = forwardRef((props, ref) => (
  <EditorProvider>
    <RichTextEditorContent {...props} ref={ref} />
  </EditorProvider>
));

export default RichTextEditor;