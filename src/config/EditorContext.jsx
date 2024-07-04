import React, { createContext, useContext, useRef } from 'react';
import { useEditorFormatting } from './UseEditorFormatting';
import { useEditorState } from './UseEditorState';

// Creating a context for the editor state and actions
const EditorContext = createContext();

// Provider component to wrap around the editor components and provide context
export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null); // Ref to hold reference to the editor DOM element
  const { formatText, updateDataAttributes } = useEditorFormatting(editorRef); // Custom hook for text formatting functions
  const state = useEditorState(editorRef, updateDataAttributes); // Custom hook for managing editor state

  // Providing editor context with state and actions to child components
  return (
    <EditorContext.Provider value={{ ...state, formatText, editorRef }}>
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook to access editor context within functional components
export const useEditor = () => useContext(EditorContext);
