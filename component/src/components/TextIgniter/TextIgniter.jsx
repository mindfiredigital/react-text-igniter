/* eslint-disable react/display-name */
import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { EditorProvider, useEditor } from "../../contexts/editorContext.jsx";
import Toolbar from "./Toolbar.jsx";
import Editor from "./Editor.jsx";
import "../../styles/text-igniter.css";

const TextIgniterContent = forwardRef(
  ({ features, height, onChange, defaultContent }, ref) => {
    const { getHtml, getJson, html, editorRef } = useEditor();

    useImperativeHandle(ref, () => ({
      getHtml,
      getJson,
      html,
      editorRef,
    }));

    useEffect(() => {
      if (editorRef?.current && !!defaultContent)
        editorRef.current.innerHTML = defaultContent;
    }, []);

    useEffect(() => {
      html !== null && onChange && typeof onChange === "function" ? onChange(html) : undefined;
    }, [html, onChange]);

    return (
      <div className="editor-container">
        <Toolbar features={features} />
        <Editor height={height} />
      </div>
    );
  }
);

const TextIgniter = forwardRef((props, ref) => (
  <EditorProvider>
    <TextIgniterContent {...props} ref={ref} />
  </EditorProvider>
));

export default TextIgniter;
