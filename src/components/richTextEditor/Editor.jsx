import React, { useState, useCallback, useEffect } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import { AppButton } from "../ui/Button.jsx";
import "../../index.css"

const Editor = () => {
  const { editorRef, wordCount, charCount, isHtmlMode, toggleHtmlMode } = useEditor();
  const [content, setContent] = useState('');

  const handleNormalModeChange = useCallback(() => {
    // setContent(editorRef.current.innerHTML);
  }, []);

  const handleHtmlModeChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [isHtmlMode]);

  return (
    <>
      <div
        id="editor"
        ref={editorRef}
        contentEditable={!isHtmlMode}
        className={`editor-content ${isHtmlMode ? "html-mode" : ""}`}
        onInput={handleNormalModeChange}
        style={{ 
          display: isHtmlMode ? "none" : "block",
          minHeight: "300px",
          padding: "10px",
          overflowY: "auto"
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {isHtmlMode && (
        <>
          <textarea
            className="html-editor"
            value={content}
            onChange={handleHtmlModeChange}
            style={{
              width: "100%",
              minHeight: "300px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              resize: "vertical",
            }}
          />
          <AppButton onClick={toggleHtmlMode}>Convert</AppButton>
        </>
      )}
      
      <div className="editor-footer" style={{ display: isHtmlMode ? "none" : "block" }}>
        <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
      </div>
    </>
  );
};

export default Editor;