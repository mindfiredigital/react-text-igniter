import React, { createContext, useContext, useRef } from "react";
import { useEditorFormatting } from "../hooks/useEditorFormatting.jsx";
import { useEditorState } from "../hooks/useEditorState.jsx";
import { useHeadingState } from "../hooks/useHeadingState.jsx";
import { useTableOperations } from "../hooks/useTableOperation.jsx";
import { useHtmlMode } from "../hooks/useHtmlMode.jsx";

// Create a context for the editor
const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  // Create a ref for the editor element
  const editorRef = useRef(null);

  // Use custom hooks to manage different aspects of the editor
  const { formatText, updateDataAttributes, applyHeading, addImageOrVideo, addLink ,isBold,isItalic,isUnderline,textAlignment,isOrderedList,isUnorderedList} =
    useEditorFormatting(editorRef);
  const state = useEditorState(editorRef, updateDataAttributes);
  const headingState = useHeadingState();
  const { insertTable, addTableRow, addTableColumn, insertLayout } = useTableOperations(editorRef);
  const { isHtmlMode, toggleHtmlMode } = useHtmlMode();

  // Combine all editor-related values and functions
  const editorValue = { 
    ...state, 
    ...headingState, 
    applyHeading, 
    formatText, 
    editorRef, 
    addImageOrVideo, 
    addLink, 
    insertTable, 
    addTableRow, 
    addTableColumn, 
    insertLayout, 
    isHtmlMode, 
    toggleHtmlMode, 
    isBold,
    isItalic,
    isUnderline,
    textAlignment,
    isOrderedList,
    isUnorderedList
  };

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook to use the editor context
export const useEditor = () => useContext(EditorContext);