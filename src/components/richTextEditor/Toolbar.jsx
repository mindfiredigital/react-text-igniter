import React, { useState } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import * as Icons from "../../assets/icon.jsx";
import { IconButton } from "../ui/Button.jsx";
import { ImageUploadSelectionDialog, FileUrlDialog } from "../ui/Dialog.jsx";
import { getJson } from "../../utils/editorUtil.jsx";

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
    insertTable,
    addTableRow,
    addTableColumn,
    insertLayout
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
    const heading = e.target.value;
    changeHeading(heading);
    applyHeading(heading);
  };

  // Handles table button clicks, triggering table changes in the editor
  const handleTableOperation = (e) => {
    const operation = e.target.value;
    switch (operation) {
      case 'insert':
        insertTable(2, 2);
        break;
      case 'addRow':
        addTableRow();
        break;
      case 'addColumn':
        addTableColumn();
        break;
      default:
        break;
    }
    e.target.value = ''; // Reset select after operation
  };

  // Handles layout button clicks, triggering layout changes in the editor
  const handleLayoutOperation = (e) => {
    const layout = e.target.value;
    switch (layout) {
      case 'single':
        insertLayout([100]);
        break;
      case 'two-equal':
        insertLayout([50, 50]);
        break;
      case 'three-equal':
        insertLayout([33.33, 33.33, 33.33]);
        break;
      case '40-60':
        insertLayout([40, 60]);
        break;
      case '60-40':
        insertLayout([60, 40]);
        break;
      default:
        break;
    }
    e.target.value = ''; // Reset select after operation
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
      <IconButton onClick={() => console.log(editorRef.current.innerHTML)}>
        Get HTML
      </IconButton>
    ),
    getJson: (
      <IconButton onClick={() => getJson(editorRef)}>Get JSON</IconButton>
    ),
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
      <select value={currentHeading} onChange={handleHeadingChange}>
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
      </select>
    ),
    htmlMode: (
      <IconButton onClick={toggleHtmlMode}>
        <Icons.CodeIcon />
      </IconButton>
    ),
    table: (
      <select onChange={handleTableOperation} className="table-select">
        <option value="">Table</option>
        <option value="insert">Insert Table</option>
        <option value="addRow">Add Row</option>
        <option value="addColumn">Add Column</option>
      </select>
    ),
    layout: (
      <select onChange={handleLayoutOperation} className="layout-select">
        <option value="">Layout</option>
        <option value="single">Single Column</option>
        <option value="two-equal">Two Columns</option>
        <option value="three-equal">Three Columns</option>
        <option value="40-60">40-60</option>
        <option value="60-40">60-40</option>
      </select>
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
