/* eslint-disable react/display-name */
// index.jsx

import React, { useImperativeHandle, forwardRef } from "react";
import { EditorProvider, useEditor } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/html-editor.css";

const HtmlEditorContent = forwardRef(({ features, height }, ref) => {
  const { getHtml, getJson } = useEditor();

  useImperativeHandle(ref, () => ({
    getHtml,
    getJson,
  }));

  return (
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor height={height} />
    </div>
  );
});

const HtmlEditor = forwardRef((props, ref) => (
  <EditorProvider>
    <HtmlEditorContent {...props} ref={ref} />
  </EditorProvider>
));

export default HtmlEditor;
