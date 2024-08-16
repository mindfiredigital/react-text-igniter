import React, { useState, useCallback, useEffect } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import { AppButton } from "../ui/Button.jsx";
import "../../index.css"

const Editor = () => {
  // Access editor-related functions and state from the context
  const { editorRef, wordCount, charCount, isHtmlMode, toggleHtmlMode } = useEditor();
  
  // State to hold the editor's content
  const [content, setContent] = useState('');

  // Handler for changes in normal (rich text) mode
  const handleNormalModeChange = useCallback((event) => {
    // setContent(event.target.innerHTML);
  }, []);

  // Handler for changes in HTML mode
  const handleHtmlModeChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  // Effect to focus the editor when switching modes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [isHtmlMode]);

  return (
    <>
      {/* Main editor area */}
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
      
      {/* HTML mode textarea and convert button */}
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
      
      {/* Editor footer with word and character count */}
      <div className="editor-footer" style={{ display: isHtmlMode ? "none" : "block" }}>
        <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
      </div>
    </>
  );
};

export default Editor;