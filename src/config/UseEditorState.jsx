import { useReducer, useEffect } from 'react';

// Initial state for word and character counts
const initialState = {
  wordCount: 0,
  charCount: 0
};

// Reducer function to update state based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNTS':
      return {
        ...state,
        wordCount: action.wordCount,
        charCount: action.charCount
      };
    default:
      return state;
  }
};

// Custom hook to manage editor state and interactions
export const useEditorState = (editorRef, updateDataAttributes) => {
  const [state, dispatch] = useReducer(reducer, initialState); // State management with reducer for word and character counts

  useEffect(() => {
    const editor = editorRef.current; // Reference to the editor DOM element

    // Function to handle click events on editor blocks
    const handleClick = (event) => {
      const blocks = editor.querySelectorAll('.editor-block');
      blocks.forEach((block) => block.classList.remove('active')); // Remove 'active' class from all blocks
      if (event.target.classList.contains('editor-block')) {
        event.target.classList.add('active'); // Add 'active' class to clicked block
      }
    };

    // Function to handle input events (typing) within the editor
    const handleInput = () => {
      const text = editor.innerText || ''; // Get text content of the editor
      const words = text.trim().split(/\s+/).filter(word => word.length > 0); // Split text into words

      // Dispatch action to update word and character counts in state
      dispatch({ type: 'SET_COUNTS', wordCount: words.length, charCount: text.length });

      const blocks = editor.querySelectorAll('.editor-block');
      blocks.forEach(updateDataAttributes); // Update data attributes for each editor block

      // Ensure at least one editor block is always present
      if (blocks.length === 0) {
        const newBlock = document.createElement('div');
        newBlock.className = 'editor-block';
        newBlock.setAttribute('contentEditable', 'true');
        newBlock.setAttribute('data-type', 'normal');
        newBlock.setAttribute('placeholder', 'Start typing...');
        editor.appendChild(newBlock); // Append new block if none exist
        newBlock.focus(); // Set focus on the new block
      }
    };

    // Event listeners for click and input events within the editor
    editor.addEventListener('click', handleClick);
    editor.addEventListener('input', handleInput);

    // Cleanup function to remove event listeners when component unmounts or updates
    return () => {
      editor.removeEventListener('click', handleClick);
      editor.removeEventListener('input', handleInput);
    };
  }, [updateDataAttributes]);

  return state;
};
