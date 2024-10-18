/* eslint-disable react/display-name */
import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import { EditorProvider, useEditor } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/text-igniter.css";

const TextIgniterContent = forwardRef(({ features, height, onChange }, ref) => {
  const { getHtml, getJson, html } = useEditor();

  useImperativeHandle(ref, () => ({
    getHtml,
    getJson,
    html
  }));

  useEffect(() => {
    (onChange && typeof onChange === "function") ? onChange(html) : undefined;
  }, [html, onChange]);

  return (
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor height={height} />
    </div>
  );
});

const TextIgniter = forwardRef((props, ref) => (
  <EditorProvider>
    <TextIgniterContent {...props} onChange={(val) => {console.log(val)}} ref={ref} />
  </EditorProvider>
));

export default TextIgniter;
