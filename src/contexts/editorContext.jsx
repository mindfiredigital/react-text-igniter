import React, { useState, createContext, useContext, useRef } from "react";
import { useEditorFormatting } from "../hooks/useEditorFormatting.jsx";
import { useEditorState } from "../hooks/useEditorState.jsx";
import { useHeadingState } from "../hooks/useHeadingState.jsx";
import { useTableOperations } from "../hooks/useTableOperation.jsx";

// Create a context for the editor
const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  // Create a ref for the editor element
  const editorRef = useRef(null);

  // Use the editor formatting hook
  const { formatText, updateDataAttributes, applyHeading, addImageOrVideo } =
    useEditorFormatting(editorRef);

  // Use the editor state hook
  const state = useEditorState(editorRef, updateDataAttributes);

  const headingState = useHeadingState();

  const { insertTable, addTableRow, addTableColumn, insertLayout } =
    useTableOperations(editorRef);

  const [isHtmlMode, setIsHtmlMode] = useState(false);

  const toggleHtmlMode = () => {
    setIsHtmlMode(!isHtmlMode);
  };

  // Combine all editor-related values and functions
  const editorValue = {
    ...state,
    ...headingState,
    applyHeading,
    formatText,
    editorRef,
    addImageOrVideo,
    insertTable,
    addTableRow,
    addTableColumn,
    insertLayout,
    isHtmlMode,
    toggleHtmlMode,
  };

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
