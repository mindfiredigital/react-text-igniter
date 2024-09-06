/* eslint-disable react/display-name */
import React, { useImperativeHandle, forwardRef } from "react";
import { EditorProvider, useEditor } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/text-igniter.css";

const TextIgniterContent = forwardRef(({ features, height }, ref) => {
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

const TextIgniter = forwardRef((props, ref) => (
  <EditorProvider>
    <TextIgniterContent {...props} ref={ref} />
  </EditorProvider>
));

export default TextIgniter;
