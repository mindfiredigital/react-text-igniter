/**
 * Converts the editor content to a JSON format
 * 
 * @param {React.RefObject} editorRef - Reference to the editor element
 */
export const getJson = (editorRef) => {
  const blocks = [];
  const editorBlocks = editorRef.current.querySelectorAll(".editor-block");

  // Process each editor block
  editorBlocks.forEach((block) => {
    let type = "text";
    let content = block.innerHTML;
    let format = block.getAttribute("data-type") || "normal";

    // Handle image blocks
    if (block.querySelector("img")) {
      type = "image";
      const img = block.querySelector("img");
      content = {
        src: img.src,
        alt: img.alt,
        caption: block.textContent.replace(img.alt, "").trim(),
      };
    }

    blocks.push({ type, content, format });
  });

  // Create the final JSON structure
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
};