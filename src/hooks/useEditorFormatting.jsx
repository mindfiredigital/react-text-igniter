import { useCallback, useState } from "react";

export const useEditorFormatting = (editorRef) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);

  const updateDataAttributes = useCallback((element) => {
    const dataType = [];

    if (isBold) dataType.push("bold");
    if (isItalic) dataType.push("italic");
    if (isUnderline) dataType.push("underline");
    if (textAlignment === "left") dataType.push("justifyLeft");
    if (textAlignment === "center") dataType.push("justifyCenter");
    if (textAlignment === "right") dataType.push("justifyRight");
    if (isOrderedList) dataType.push("orderedList");
    if (isUnorderedList) dataType.push("unorderedList");

    element.setAttribute("data-type", dataType.join("-") || "normal");
  }, [isBold, isItalic, isUnderline, textAlignment, isOrderedList, isUnorderedList]);

  const formatText = useCallback(
    (command, value = null) => {
      const editor = editorRef.current;
      if (editor) {
        switch (command) {
          case "bold":
            setIsBold(prev => !prev);
            break;
          case "italic":
            setIsItalic(prev => !prev);
            break;
          case "underline":
            setIsUnderline(prev => !prev);
            break;
          case "justifyLeft":
          case "justifyCenter":
          case "justifyRight":
            setTextAlignment(command.replace("justify", "").toLowerCase());
            break;
          case "insertOrderedList":
            setIsOrderedList(prev => !prev);
            setIsUnorderedList(false); // Disable unordered list when ordered list is active
            break;
          case "insertUnorderedList":
            setIsUnorderedList(prev => !prev);
            setIsOrderedList(false); // Disable ordered list when unordered list is active
            break;
          default:
            console.log(`Applying command: ${command}`);
        }

        document.execCommand(command, false, value);

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;

        if (parentElement !== editor) {
          updateDataAttributes(parentElement);
        }
      }
    },
    [editorRef, updateDataAttributes]
  );

  const applyHeading = useCallback(
    (heading) => {
      const editor = editorRef.current;
      if (editor) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        const newElement = document.createElement(heading);
        range.surroundContents(newElement);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    [editorRef]
  );

  const addImageOrVideo = useCallback(
    (file, fileUrl) => {
      const editor = editorRef.current;
      if (editor) {
        let element;
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (file.type.startsWith("image/")) {
              element = document.createElement("img");
              element.src = e.target.result;
              element.alt = file.name;
            } else if (file.type.startsWith("video/")) {
              element = document.createElement("video");
              element.src = e.target.result;
              element.controls = true;
            }
            insertElement(element);
          };
          reader.readAsDataURL(file);
        } else if (fileUrl) {
          if (fileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
            element = document.createElement("img");
            element.src = fileUrl;
            element.alt = "Inserted image";
          } else if (fileUrl.match(/\.(mp4|webm|ogg)$/)) {
            element = document.createElement("video");
            element.src = fileUrl;
            element.controls = true;
          }
          insertElement(element);
        }
      }
    },
    [editorRef]
  );

  const insertElement = (element) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(element);
    range.setStartAfter(element);
    range.setEndAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const addLink = useCallback(
    (linkText, linkUrl) => {
      const editor = editorRef.current;
      if (editor) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        const anchor = document.createElement("a");
        anchor.href = linkUrl;
        anchor.textContent = linkText;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";

        range.deleteContents();
        range.insertNode(anchor);

        range.setStartAfter(anchor);
        range.setEndAfter(anchor);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    [editorRef]
  );

  return {
    formatText,
    updateDataAttributes,
    applyHeading,
    addImageOrVideo,
    addLink,
    isBold,
    isItalic,
    isUnderline,
    textAlignment,
    isOrderedList,
    isUnorderedList,
  };
};
