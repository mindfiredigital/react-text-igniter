import { useReducer, useEffect } from "react";

const initialState = { wordCount: 0, charCount: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTS":
      return {
        ...state,
        wordCount: action.wordCount,
        charCount: action.charCount,
      };
    default:
      return state;
  }
};

export const useEditorState = (editorRef, updateDataAttributes) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const editor = editorRef.current;

    const handleInput = () => {
      const text = editor.innerText || "";
      const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
      
      dispatch({
        type: "SET_COUNTS",
        wordCount: words.length,
        charCount: text.length,
      });

      updateDataAttributes(editor);
    };

    editor.addEventListener("input", handleInput);

    return () => {
      editor.removeEventListener("input", handleInput);
    };
  }, [editorRef, updateDataAttributes]);

  return state;
};
