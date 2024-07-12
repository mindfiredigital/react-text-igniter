import React, {useState , createContext, useContext, useRef } from "react";
import { useEditorFormatting } from "../hooks/useEditorFormatting.jsx";
import { useEditorState } from "../hooks/useEditorState.jsx";
import { useHeadingState } from "../hooks/useHeadingState.jsx";
// Create a context for the editor
const EditorContext = createContext();

/**
 * EditorProvider Component
 * 
 * This component provides the editor context to its children.
 * It sets up the editor ref and combines various editor-related hooks.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The EditorProvider component
 */
export const EditorProvider = ({ children }) => {
  // Create a ref for the editor element
  const editorRef = useRef(null);

  // Use the editor formatting hook
  const { formatText, updateDataAttributes,applyHeading } = useEditorFormatting(editorRef);

  // Use the editor state hook
  const state = useEditorState(editorRef, updateDataAttributes);

  const headingState = useHeadingState();

  const [isHtmlMode, setIsHtmlMode] = useState(false);

  const toggleHtmlMode = () => {
    setIsHtmlMode(!isHtmlMode);
  };

  // Combine all editor-related values and functions
  const editorValue = { ...state, ...headingState , applyHeading , formatText, editorRef, isHtmlMode , toggleHtmlMode};

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};

/**
 * useEditor Hook
 * 
 * A custom hook to access the editor context.
 * 
 * @returns {Object} The editor context value
 */
export const useEditor = () => useContext(EditorContext);