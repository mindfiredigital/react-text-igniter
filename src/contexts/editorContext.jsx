// editorContext.jsx

import React, { createContext, useContext, useRef, useCallback } from "react";
import { useEditorFormatting } from "../hooks/useEditorFormatting.jsx";
import { useEditorState } from "../hooks/useEditorState.jsx";
import { useHeadingState } from "../hooks/useHeadingState.jsx";
import { useTableOperations } from "../hooks/useTableOperation.jsx";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null);

  const {
    formatText,
    updateDataAttributes,
    applyHeading,
    addImageOrVideo,
    addLink,
    activeStyles
  } = useEditorFormatting(editorRef);

  const state = useEditorState(editorRef, updateDataAttributes);
  const headingState = useHeadingState();
  const { insertTable, addTableRow, addTableColumn, insertLayout } = useTableOperations(editorRef);

  const getHtml = useCallback(() => {
    return editorRef.current ? editorRef.current.innerHTML : '';
  }, []);

  const getJson = useCallback(() => {
    if (!editorRef.current) return null;

    const parseNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      const result = {
        type: node.nodeName.toLowerCase(),
        attributes: {},
        children: []
      };

      // Parse attributes
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        result.attributes[attr.name] = attr.value;
      }

      // Parse children
      node.childNodes.forEach(child => {
        result.children.push(parseNode(child));
      });

      return result;
    };

    return parseNode(editorRef.current);
  }, []);

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
    getHtml,
    getJson
  };

  return (
    <EditorContext.Provider value={editorValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);