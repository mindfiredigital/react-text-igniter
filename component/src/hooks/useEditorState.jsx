import { useReducer, useEffect } from "react";

const initialState = { wordCount: 0, charCount: 0, html: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTS":
      return {
        ...state,
        wordCount: action.wordCount,
        charCount: action.charCount,
      };
    case "UPDATE_HTML":
      return {
        ...state,
        html: action.html,
      };
    default:
      return state;
  }
};

export const useEditorState = (editorRef, updateDataAttributes) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const editor = editorRef.current;
    let editorChangedHtml = state.html;

    const handleInput = () => {
      const text = editor.innerText || "";
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      dispatch({
        type: "SET_COUNTS",
        wordCount: words.length,
        charCount: text.length,
      });

      updateDataAttributes(editor);

      handleChange();
    };

    const handleChange = () => {
      const newHtml = editor.innerHTML || "";

      if (editorChangedHtml !== newHtml) {
        editorChangedHtml = newHtml;

        dispatch({
          type: "UPDATE_HTML",
          html: newHtml,
        });
      }
    };

    editor.addEventListener("input", handleInput);
    editor.addEventListener("change", handleChange);

    return () => {
      editor.removeEventListener("input", handleInput);
      editor.removeEventListener("change", handleChange);
    };
  }, [editorRef, updateDataAttributes]);

  return state;
};
