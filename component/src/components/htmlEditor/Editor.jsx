import React, { useEffect } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import "../../index.css";

const Editor = ({ height = "300px" }) => {
  const { editorRef, wordCount, charCount } = useEditor();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);

  return (
    <>
      <div
        id="editor"
        ref={editorRef}
        contentEditable
        className="editor-content"
        style={{ 
          minHeight: height,
          padding: "10px",
          overflowY: "auto"
        }}
      />
      
      <div className="editor-footer">
        <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
      </div>
    </>
  );
};

export default Editor;