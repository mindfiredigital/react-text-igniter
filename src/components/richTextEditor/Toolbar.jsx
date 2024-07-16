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
    addImage,
  } = useEditor();
  /**
   * Handles image submission from the dialog
   * @param {Object} param0 - Destructured object containing file and imageUrl
   * @param {File} param0.file - The selected image file
   * @param {string} param0.imageUrl - The entered image URL
   */
  const handleImageSubmit = ({ file, imageUrl }) => {
    addImage(file, imageUrl);
    // if (file) {
    //       const reader = new FileReader();
    //       reader.onload = (e) => {
    //         const img = document.createElement("img");
    //         img.src = e.target.result;
    //         img.alt = file.name;
    //         img.style.maxWidth = "100%";
            
    //         activeBlock.appendChild(img);
    //       };
    //       reader.readAsDataURL(file);

    // } else if (imageUrl) {
    //       const img = document.createElement("img");
    //       img.src = imageUrl;
    //       img.alt = "Inserted image";
    //       img.style.maxWidth = "100%";
    //       activeBlock.appendChild(img);
    // }
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
      <IconButton onClick={() => formatText("bold")} id="boldBtn" toolTip={"Bold"}>
        <Icons.BoldIcon />
      </IconButton>
    ),
    italic: (
      <IconButton onClick={() => formatText("italic")} id="italicBtn" toolTip={"Italic"}>
        <Icons.ItalicIcon />
      </IconButton>
    ),
    underline: (
      <IconButton onClick={() => formatText("underline")} id="underlineBtn" toolTip={"Underline"}>
        <Icons.UnderlineIcon />
      </IconButton>
    ),
    orderedList: (
      <IconButton onClick={() => formatText("insertOrderedList")} toolTip={"Ordered List"}>
        <Icons.OrderedListIcon />
      </IconButton>
    ),
    unorderedList: (
      <IconButton onClick={() => formatText("insertUnorderedList")} toolTip={"Unordered List"}>
        <Icons.UnOrderedListIcon />
      </IconButton>
    ),
    justifyLeft: (
      <IconButton onClick={() => formatText("justifyLeft")} toolTip={"Justify List"}>
        <Icons.AlignLeftIcon />
      </IconButton>
    ),
    justifyCenter: (
      <IconButton onClick={() => formatText("justifyCenter")} toolTip={"Justify Center"}>
        <Icons.AlignCenterIcon />
      </IconButton>
    ),
    justifyRight: (
      <IconButton onClick={() => formatText("justifyRight")} toolTip={"Justify Right"}>
        <Icons.AlignRightIcon />
      </IconButton>
    ),
    createLink: (
      <>
        <IconButton onClick={() => setUrlDialogOpen(true)} toolTip={"Create Link"}>
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
        <IconButton onClick={() => setImageDialogOpen(true)} toolTip={"Insert Image"}>
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
      <IconButton onClick={() => console.log(editorRef.current.innerHTML)} toolTip={"Get HTML"}>
        Get HTML
      </IconButton>
    ),
    getJson: (
      <IconButton onClick={() => getJson(editorRef)} toolTip={"Get JSON"}>
        Get JSON
      </IconButton>
    ),
    superscript: (
      <IconButton onClick={() => formatText("superscript")} toolTip={"Superscript"}>
        <Icons.SuperScriptIcon />
      </IconButton>
    ),
    subscript: (
      <IconButton onClick={() => formatText("subscript")} toolTip={"Subscript"}>
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
      <IconButton onClick={toggleHtmlMode} toolTip={"Html mode"}>
        <Icons.CodeIcon />
      </IconButton>
    ),
    columnLayout: (
      <IconDropDown
        id="columnLayoutDropdown"
        selected={currentHeading}
        items={[
          { value: "singleColumn", label: "Single Column" },
          { value: "twoColumn", label: "Two Column" },
          { value: "threeColumn", label: "Three Column" },
          { value: "fourColumn", label: "Three Column" },
          { value: "sixtyFortyRatio", label: "60/40" },
          { value: "fortySixtyRatio", label: "40/60" },
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
