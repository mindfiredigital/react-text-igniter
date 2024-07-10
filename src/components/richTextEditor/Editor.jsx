import React from "react";
import { useEditor } from "../../contexts/editorContext.jsx";

/**
 * Editor Component
 * 
 * This component represents the main editable area of the text editor.
 * It uses the useEditor hook to access editor-related functionality and state.
 * 
 * @returns {JSX.Element} The rendered Editor component
 */
const Editor = () => {
  // Destructure necessary values and functions from the useEditor hook
  const { editorRef, wordCount, charCount } = useEditor();

  return (
    <>
      {/* Main editable container */}
      <div id="editor" ref={editorRef} contentEditable="true">
        {/* Initial editable block */}
        <div
          className="editor-block"
          contentEditable="true"
          data-type="normal"
          placeholder="Start typing..."
        ></div>
      </div>

      {/* Footer displaying word and character counts */}
      <div className="editor-footer">
        <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
      </div>
    </>
  );
};

export default Editor;