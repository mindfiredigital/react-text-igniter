/**
 * Converts the editor content to a JSON format
 * 
 * @param {React.RefObject} editorRef - Reference to the editor element
 */
export const getJson = (editorRef) => {
  const editor = editorRef.current;
  const blocks = [];

  // Process the content of the single editor div
  const childNodes = Array.from(editor.childNodes);
  
  childNodes.forEach((node) => {
    let type = "text";
    let content = "";
    let format = "normal";

    if (node.nodeType === Node.TEXT_NODE) {
      content = node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      content = node.innerHTML;
      
      if (node.tagName === "IMG") {
        type = "image";
        content = {
          src: node.src,
          alt: node.alt,
          caption: node.nextSibling?.textContent?.trim() || "",
        };
      } else if (node.tagName === "TABLE") {
        type = "table";
        const rows = Array.from(node.rows).map(row => 
          Array.from(row.cells).map(cell => cell.innerHTML)
        );
        content = {
          rows: rows,
          rowCount: node.rows.length,
          columnCount: node.rows[0].cells.length
        };
      } else {
        format = node.tagName.toLowerCase();
      }
    }

    if (content) {
      blocks.push({ type, content, format });
    }
  });

  const jsonContent = JSON.stringify(
    {
      version: "1.0.0",
      time: Date.now(),
      blocks,
    },
    null,
    2
  );

  console.log(jsonContent);
  return jsonContent;
};

/**
 * Gets the HTML content of the editor
 * 
 * @param {React.RefObject} editorRef - Reference to the editor element
 * @returns {string} The HTML content of the editor
 */
export const getHtml = (editorRef) => {
  const editor = editorRef.current;
  return editor.innerHTML;
};