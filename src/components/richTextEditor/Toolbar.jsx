import React, { useState, useEffect } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import * as Icons from "../../assets/icon.jsx";
import { IconButton } from "../ui/Button.jsx";
import { ImageUploadSelectionDialog, FileUrlDialog } from "../ui/Dialog.jsx";
import { getJson } from "../../utils/editorUtil.jsx";
import { IconDropDown } from "../ui/Dropdown.jsx";
import { usePreviewMode } from "../../hooks/usePreviewMode.jsx";

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

  // State for preview mode
  const { isToolbarVisible, toggleToolbarVisibility } = usePreviewMode();

  // State for tracking active formats
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    superscript: false,
    subscript: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
  });

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
    insertLayout,
    addImageOrVideo,
    addLink,
  } = useEditor();

  /**
   * Handles image submission from the dialog
   * @param {Object} param0 - Destructured object containing file and imageUrl
   * @param {File} param0.file - The selected image file
   * @param {string} param0.imageUrl - The entered image URL
   */
  const handleImageSubmit = ({ file, fileUrl }) => {
    addImageOrVideo(file, fileUrl);
  };

  // Handles heading button clicks, triggering heading changes in the editor
  const handleHeadingChange = (e) => {
    const heading = e;
    changeHeading(heading);
    applyHeading(heading);
  };

  const handleFormatText = (format) => {
    formatText(format);
    updateActiveFormats(format);
  };

  const updateActiveFormats = (format) => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      const styles = window.getComputedStyle(activeBlock);
      // Update the specific format without changing the others
      const newFormats = { ...activeFormats };

      switch (format) {
        case "bold":
          newFormats.bold = !newFormats.bold;
          break;
        case "italic":
          newFormats.italic = !newFormats.italic;
          break;
        case "underline":
          newFormats.underline = !newFormats.underline;
          break;
        case "superscript":
          newFormats.superscript = !newFormats.superscript;
          break;
        case "subscript":
          newFormats.subscript = !newFormats.subscript;
          break;
        case "justifyLeft":
          newFormats.justifyLeft = true;
          newFormats.justifyCenter = false;
          newFormats.justifyRight = false;
          break;
        case "justifyCenter":
          newFormats.justifyLeft = false;
          newFormats.justifyCenter = true;
          newFormats.justifyRight = false;
          break;
        case "justifyRight":
          newFormats.justifyLeft = false;
          newFormats.justifyCenter = false;
          newFormats.justifyRight = true;
          break;
        default:
          break;
      }

      setActiveFormats(newFormats);
    }
  };

  // Handles table button clicks, triggering table changes in the editor
  const handleTableOperation = (operation) => {
    switch (operation) {
      case "insert":
        insertTable(2, 2);
        break;
      case "addRow":
        addTableRow();
        break;
      case "addColumn":
        addTableColumn();
        break;
      default:
        break;
    }
    operation = ""; // Reset select after operation
  };

  // Handles layout button clicks, triggering layout changes in the editor
  const handleLayoutOperation = (layout) => {
    switch (layout) {
      case "single":
        insertLayout([100]);
        break;
      case "two-equal":
        insertLayout([50, 50]);
        break;
      case "three-equal":
        insertLayout([33.33, 33.33, 33.33]);
        break;
      case "40-60":
        insertLayout([40, 60]);
        break;
      case "60-40":
        insertLayout([60, 40]);
        break;
      default:
        break;
    }
    //e.target.value = ""; // Reset select after operation
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            handleFormatText("bold");
            break;
          case "i":
            e.preventDefault();
            handleFormatText("italic");
            break;
          case "u":
            e.preventDefault();
            handleFormatText("underline");
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Object containing all available toolbar buttons
  const featureButtons = {
    bold: (
      <IconButton
        onClick={() => handleFormatText("bold")}
        id="boldBtn"
        toolTip={"Bold"}
        isActive={activeFormats.bold}
      >
        <Icons.BoldIcon />
      </IconButton>
    ),
    italic: (
      <IconButton
        onClick={() => handleFormatText("italic")}
        id="italicBtn"
        toolTip={"Italic"}
        isActive={activeFormats.italic}
      >
        <Icons.ItalicIcon />
      </IconButton>
    ),
    underline: (
      <IconButton
        onClick={() => handleFormatText("underline")}
        id="underlineBtn"
        toolTip={"Underline"}
        isActive={activeFormats.underline}
      >
        <Icons.UnderlineIcon />
      </IconButton>
    ),
    orderedList: (
      <IconButton onClick={() => handleFormatText("insertOrderedList")} toolTip={"Ordered List"}>
        <Icons.OrderedListIcon />
      </IconButton>
    ),
    unorderedList: (
      <IconButton
        onClick={() => handleFormatText("insertUnorderedList")}
        toolTip={"Unordered List"}
      >
        <Icons.UnOrderedListIcon />
      </IconButton>
    ),
    justifyLeft: (
      <IconButton
        onClick={() => handleFormatText("justifyLeft")}
        toolTip={"Justify List"}
        isActive={activeFormats.justifyLeft}
      >
        <Icons.AlignLeftIcon />
      </IconButton>
    ),
    justifyCenter: (
      <IconButton
        onClick={() => handleFormatText("justifyCenter")}
        toolTip={"Justify Center"}
        isActive={activeFormats.justifyCenter}
      >
        <Icons.AlignCenterIcon />
      </IconButton>
    ),
    justifyRight: (
      <IconButton
        onClick={() => handleFormatText("justifyRight")}
        toolTip={"Justify Right"}
        isActive={activeFormats.justifyRight}
      >
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
          onSubmit={(url) => addLink("createLink", url)}
        />
      </>
    ),
    insertImage: (
      <>
        <IconButton onClick={() => setImageDialogOpen(true)} toolTip={"Insert Image/video"}>
          <Icons.ImageIcon />
        </IconButton>
        <ImageUploadSelectionDialog
          isOpen={isImageDialogOpen}
          onClose={() => setImageDialogOpen(false)}
          title="Select Image/Video file"
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
      <IconButton
        onClick={() => handleFormatText("superscript")}
        toolTip={"Superscript"}
        isActive={activeFormats.superscript}
      >
        <Icons.SuperScriptIcon />
      </IconButton>
    ),
    subscript: (
      <IconButton
        onClick={() => handleFormatText("subscript")}
        toolTip={"Subscript"}
        isActive={activeFormats.subscript}
      >
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
    table: (
      <IconDropDown
        id="tableDropdown"
        selected="insert"
        items={[
          { value: "insert", label: "Insert Table" },
          { value: "addRow", label: "Add Row" },
          { value: "addColumn", label: "Add Column" },
        ]}
        onChange={handleTableOperation}
      >
        <Icons.TableIcon />
      </IconDropDown>
    ),
    layout: (
      <IconDropDown
        id="layoutDropdown"
        selected="single"
        items={[
          { value: "single", label: "Single Column" },
          { value: "two-equal", label: "Two Columns" },
          { value: "three-equal", label: "Three Columns" },
          { value: "40-60", label: "40-60" },
          { value: "60-40", label: "60-40" },
        ]}
        onChange={handleLayoutOperation}
      >
        <Icons.LayoutIcon />
      </IconDropDown>
    ),
  };

  return (
    <div className="toolbar">
      <div className="toolbar-switch">
        <label>
          <input type="checkbox" checked={isToolbarVisible} onChange={toggleToolbarVisibility} />
          {!isToolbarVisible ? "Preview Mode" : "Edit Mode"}
        </label>
      </div>
      {!isHtmlMode &&
        !isToolbarVisible &&
        features.map((feature, index) => (
          <React.Fragment key={index}>{featureButtons[feature]}</React.Fragment>
        ))}
    </div>
  );
};

export default Toolbar;
