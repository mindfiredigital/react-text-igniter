import React, { useState } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import * as Icons from "../../assets/icon.jsx";
import { IconButton } from "../ui/Button.jsx";
import { ImageUploadSelectionDialog, FileUrlDialog } from "../ui/Dialog.jsx";
import { getJson } from "../../utils/editorUtil.jsx";
import { IconDropDown } from "../ui/Dropdown.jsx";

/**
 * Toolbar Component
 *
 * This component renders a toolbar with various formatting and action buttons for the editor.
 * It uses the useEditor hook to access editor-related functionality.
 *
 * @param {Object} props - Component props
 * @param {Array} props.features - Array of feature names to be displayed in the toolbar
 * @returns {JSX.Element} The rendered Toolbar component
 */
const Toolbar = ({ features }) => {
  // State for managing dialog visibility
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const [isUrlDialogOpen, setUrlDialogOpen] = useState(false);

  // Access editor-related functions from the context
  const {
    formatText,
    editorRef,
    currentHeading,
    changeHeading,
    isHtmlMode,
    toggleHtmlMode,
    applyHeading,
  } = useEditor();
  /**
   * Handles image submission from the dialog
   * @param {Object} param0 - Destructured object containing file and imageUrl
   * @param {File} param0.file - The selected image file
   * @param {string} param0.imageUrl - The entered image URL
   */
  const handleImageSubmit = ({ file, imageUrl }) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => formatText("insertImage", e.target.result);
      reader.readAsDataURL(file);
    } else if (imageUrl) {
      formatText("insertImage", imageUrl);
    }
  };

  // Handles heading button clicks, triggering heading changes in the editor
  const handleHeadingChange = (e) => {
    const heading = e;
    changeHeading(heading);
    applyHeading(heading);
  };

  const handleColumnLayoutChange = (value) => {
    console.log("===========",value,"==========")
    const activeBlock = editorRef.current.querySelector(".editor-block.active");
    // if (activeBlock) {
    //   activeBlock.className = `editor-block active layout-${layout}`;
    //   if (layout !== "single") {
    //     const columns = Number(layout === "two" ? 2 : 3);
    //     activeBlock.innerHTML = Array(columns)
    //       .fill('<div class="column" contenteditable="true"><p>Edit this content</p></div>')
    //       .join("");
    //   } else {
    //     activeBlock.innerHTML =
    //       '<div class="column" contenteditable="true"><p>Edit this content</p></div>';
    //   }
    // }
  };

  // Object containing all available toolbar buttons
  const featureButtons = {
    bold: (
      <IconButton onClick={() => formatText("bold")} id="boldBtn">
        <Icons.BoldIcon />
      </IconButton>
    ),
    italic: (
      <IconButton onClick={() => formatText("italic")} id="italicBtn">
        <Icons.ItalicIcon />
      </IconButton>
    ),
    underline: (
      <IconButton onClick={() => formatText("underline")} id="underlineBtn">
        <Icons.UnderlineIcon />
      </IconButton>
    ),
    orderedList: (
      <IconButton onClick={() => formatText("insertOrderedList")}>
        <Icons.OrderedListIcon />
      </IconButton>
    ),
    unorderedList: (
      <IconButton onClick={() => formatText("insertUnorderedList")}>
        <Icons.UnOrderedListIcon />
      </IconButton>
    ),
    justifyLeft: (
      <IconButton onClick={() => formatText("justifyLeft")}>
        <Icons.AlignLeftIcon />
      </IconButton>
    ),
    justifyCenter: (
      <IconButton onClick={() => formatText("justifyCenter")}>
        <Icons.AlignCenterIcon />
      </IconButton>
    ),
    justifyRight: (
      <IconButton onClick={() => formatText("justifyRight")}>
        <Icons.AlignRightIcon />
      </IconButton>
    ),
    createLink: (
      <>
        <IconButton onClick={() => setUrlDialogOpen(true)}>
          <Icons.LinkIcon />
        </IconButton>
        <FileUrlDialog
          isOpen={isUrlDialogOpen}
          onClose={() => setUrlDialogOpen(false)}
          title="Provide URL"
          onSubmit={(url) => formatText("createLink", url)}
        />
      </>
    ),
    insertImage: (
      <>
        <IconButton onClick={() => setImageDialogOpen(true)}>
          <Icons.ImageIcon />
        </IconButton>
        <ImageUploadSelectionDialog
          isOpen={isImageDialogOpen}
          onClose={() => setImageDialogOpen(false)}
          title="Select Image"
          onSubmit={handleImageSubmit}
        />
      </>
    ),
    getHtml: (
      <IconButton onClick={() => console.log(editorRef.current.innerHTML)}>Get HTML</IconButton>
    ),
    getJson: <IconButton onClick={() => getJson(editorRef)}>Get JSON</IconButton>,
    superscript: (
      <IconButton onClick={() => formatText("superscript")}>
        <Icons.SuperScriptIcon />
      </IconButton>
    ),
    subscript: (
      <IconButton onClick={() => formatText("subscript")}>
        <Icons.SubScriptIcon />
      </IconButton>
    ),
    heading: (
      <IconDropDown
        id="headingDropdown"
        selected={currentHeading}
        items={[
          { value: "p", label: "Paragraph" },
          { value: "h1", label: "Heading 1" },
          { value: "h2", label: "Heading 2" },
          { value: "h3", label: "Heading 3" },
          { value: "h4", label: "Heading 4" },
          { value: "h5", label: "Heading 5" },
          { value: "h6", label: "Heading 6" },
        ]}
        onChange={handleHeadingChange}
      />
    ),
    htmlMode: (
      <IconButton onClick={toggleHtmlMode}>
        <Icons.CodeIcon />
      </IconButton>
    ),
    columnLayout: (
      <IconDropDown
        id="columnLayoutDropdown"
        selected={currentHeading}
        items={[
          { value: "fruit", label: "Fruit" },
          { value: "vegetable", label: "Vegetable" },
          { value: "meat", label: "Meat" },
        ]}
        onChange={handleColumnLayoutChange}
      />
    ),
  };

  return (
    <div className="toolbar">
      {!isHtmlMode &&
        features.map((feature, index) => (
          <React.Fragment key={index}>{featureButtons[feature]}</React.Fragment>
        ))}
    </div>
  );
};

export default Toolbar;
