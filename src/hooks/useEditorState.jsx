import { useReducer, useEffect } from "react";

// Initial state for the editor
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

    /**
     * Handles click events within the editor
     *
     * @param {Event} event - Click event
     */
    const handleClick = (event) => {
      // Remove active class from all blocks
      editor
        .querySelectorAll(".editor-block")
        .forEach((block) => block.classList.remove("active"));

      // Add active class to clicked block
      if (event.target.classList.contains("editor-block")) {
        event.target.classList.add("active");
      }
    };

    /**
     * Handles input events within the editor
     */
    const handleInput = () => {
      const text = editor.innerText || "";
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      // Update word and character counts
      dispatch({
        type: "SET_COUNTS",
        wordCount: words.length,
        charCount: text.length,
      });

      // Update data attributes for all blocks
      editor.querySelectorAll(".editor-block").forEach(updateDataAttributes);

      // Add a new block if the editor is empty
      if (editor.children.length === 0) {
        const newBlock = document.createElement("div");
        newBlock.className = "editor-block";
        newBlock.setAttribute("contentEditable", "true");
        newBlock.setAttribute("data-type", "normal");
        newBlock.setAttribute("placeholder", "Start typing...");
        editor.appendChild(newBlock);
        newBlock.focus();
      }
    };

    // Add event listeners
    editor.addEventListener("click", handleClick);
    editor.addEventListener("input", handleInput);

    // Clean up event listeners on unmount
    return () => {
      editor.removeEventListener("click", handleClick);
      editor.removeEventListener("input", handleInput);
    };
  }, [updateDataAttributes]);

  return state;
};
