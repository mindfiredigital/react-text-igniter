import React, { createContext, useContext, useRef } from "react";
import { useEditorFormatting } from "../hooks/useEditorFormatting.jsx";
import { useEditorState } from "../hooks/useEditorState.jsx";
import { useHeadingState } from "../hooks/useHeadingState.jsx";
import { useTableOperations } from "../hooks/useTableOperation.jsx";
import { getJson, getHtml } from "../utils/editorUtil.jsx";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null);

  const { formatText, updateDataAttributes, applyHeading, addImageOrVideo, addLink, activeStyles } =
    useEditorFormatting(editorRef);
  const state = useEditorState(editorRef, updateDataAttributes);
  const headingState = useHeadingState();
  const { insertTable, addTableRow, addTableColumn, insertLayout } = useTableOperations(editorRef);

  const editorContent = {
    getJson: () => getJson(editorRef),
    getHtml: () => getHtml(editorRef)
  };

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
    activeStyles,
    editorContent
  };

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
