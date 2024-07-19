import React,{useState,useCallback,useEffect} from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import { AppButton } from "../ui/Button.jsx";
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
  const { editorRef, wordCount, charCount, isHtmlMode, toggleHtmlMode } = useEditor();
  const [content, setContent] = useState('<div class="editor-block active" contenteditable="true" data-type="normal" placeholder="Start typing..."></div>');

   // Callback function to handle changes in normal mode (contenteditable)
  const handleNormalModeChange = useCallback((event) => {
    // setContent(event.target.innerHTML);
  }, []);

  // Callback function to handle changes in HTML mode (textarea)
  const handleHtmlModeChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  // Function to move the cursor to the end of the content in normal mode
  const moveCursorToEnd = useCallback(() => {
    if (editorRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      editorRef.current.focus();
    }
  }, [editorRef]);

   // Effect to move the cursor to the end when switching from HTML mode to normal mode
  useEffect(() => {
    if (!isHtmlMode) {
      moveCursorToEnd();
    }
  }, [content, isHtmlMode, moveCursorToEnd]);
  return (
    <>
      {/* Editor area */}
    <div 
      id="editor" 
      ref={editorRef} 
      contentEditable={!isHtmlMode}
      className={isHtmlMode ? 'html-mode' : ''}
      onInput={handleNormalModeChange}
      style={{ display: isHtmlMode ? 'none' : 'block' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
     {/* HTML mode textarea */}
    {isHtmlMode && (
      <>
      <textarea
        className="html-editor"
        value={content}
        onChange={handleHtmlModeChange}
        style={{
          width: '100%',
          minHeight: '300px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          resize: 'vertical'
        }}
      />
        {/* Button to toggle between HTML mode and normal mode */}
      <AppButton onClick={toggleHtmlMode}>
      Convert
    </AppButton>
      </>
    )}
     {/* Editor footer showing word and character counts */}
    <div className="editor-footer" 
    style={{ display: isHtmlMode ? 'none' : 'block' }}>
      <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
    </div>
  </>
  );
};

export default Editor;
