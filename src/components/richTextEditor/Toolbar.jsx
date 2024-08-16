import React from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import * as Icons from "../../assets/icon.jsx";
import { IconButton } from "../ui/Button.jsx";
import { ImageUploadSelectionDialog, FileUrlDialog } from "../ui/Dialog.jsx";
import { getJson, getHtml } from "../../utils/editorUtil.jsx";
import { IconDropDown } from "../ui/Dropdown.jsx";
import { usePreviewMode } from "../../hooks/usePreviewMode.jsx";
import { ParagraphStyleButton } from "../ui/toolBar/ParagraphStyleButton.jsx";

const Toolbar = ({ features }) => {
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

  const { isToolbarVisible, toggleToolbarVisibility } = usePreviewMode();

  const [isImageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [isUrlDialogOpen, setUrlDialogOpen] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState("");

  const handleChange = (value) => {
    setSelectedStyle(value);
    applyHeading(value);
  };

  const handleImageSubmit = ({ file, fileUrl }) => {
    addImageOrVideo(file, fileUrl);
  };

  const handleTableOperation = (operation) => {
    switch (operation) {
      case "insert": insertTable(2, 2); break;
      case "addRow": addTableRow(); break;
      case "addColumn": addTableColumn(); break;
      default: break;
    }
  };

  const handleLayoutOperation = (layout) => {
    switch (layout) {
      case "single": insertLayout([100]); break;
      case "two-equal": insertLayout([50, 50]); break;
      case "three-equal": insertLayout([33.33, 33.33, 33.33]); break;
      case "40-60": insertLayout([40, 60]); break;
      case "60-40": insertLayout([60, 40]); break;
      default: break;
    }
  };

  const featureButtons = {
    bold: <IconButton onClick={() => formatText("bold")} toolTip="Bold"><Icons.BoldIcon /></IconButton>,
    italic: <IconButton onClick={() => formatText("italic")} toolTip="Italic"><Icons.ItalicIcon /></IconButton>,
    underline: <IconButton onClick={() => formatText("underline")} toolTip="Underline"><Icons.UnderlineIcon /></IconButton>,
    orderedList: <IconButton onClick={() => formatText("insertOrderedList")} toolTip="Ordered List"><Icons.OrderedListIcon /></IconButton>,
    unorderedList: <IconButton onClick={() => formatText("insertUnorderedList")} toolTip="Unordered List"><Icons.UnOrderedListIcon /></IconButton>,
    justifyLeft: <IconButton onClick={() => formatText("justifyLeft")} toolTip="Justify Left"><Icons.AlignLeftIcon /></IconButton>,
    justifyCenter: <IconButton onClick={() => formatText("justifyCenter")} toolTip="Justify Center"><Icons.AlignCenterIcon /></IconButton>,
    justifyRight: <IconButton onClick={() => formatText("justifyRight")} toolTip="Justify Right"><Icons.AlignRightIcon /></IconButton>,
    createLink: (
      <>
        <IconButton onClick={() => setUrlDialogOpen(true)} toolTip="Create Link"><Icons.LinkIcon /></IconButton>
        <FileUrlDialog
          isOpen={isUrlDialogOpen}
          onClose={() => setUrlDialogOpen(false)}
          title="Provide URL"
          linkText=""
          link=""
          onSubmit={(data) => addLink(data.text, data.url)}
        />
      </>
    ),
    insertImage: (
      <>
        <IconButton onClick={() => setImageDialogOpen(true)} toolTip="Insert Image/video"><Icons.ImageIcon /></IconButton>
        <ImageUploadSelectionDialog
          isOpen={isImageDialogOpen}
          onClose={() => setImageDialogOpen(false)}
          title="Select Image/Video file"
          onSubmit={handleImageSubmit}
        />
      </>
    ),
    getHtml: <IconButton onClick={() => console.log(getHtml(editorRef))} toolTip="Get HTML">Get HTML</IconButton>,
    getJson: <IconButton onClick={() => getJson(editorRef)} toolTip="Get JSON">Get JSON</IconButton>,
    superscript: <IconButton onClick={() => formatText("superscript")} toolTip="Superscript"><Icons.SuperScriptIcon /></IconButton>,
    subscript: <IconButton onClick={() => formatText("subscript")} toolTip="Subscript"><Icons.SubScriptIcon /></IconButton>,
    heading: (
      <ParagraphStyleButton
        items={[
          { value: "normal", label: "Normal" },
          { value: "p", label: "Paragraph" },
          { value: "h1", label: "Heading 1" },
          { value: "h2", label: "Heading 2" },
          { value: "h3", label: "Heading 3" },
          { value: "h4", label: "Heading 4" },
          { value: "h5", label: "Heading 5" },
          { value: "h6", label: "Heading 6" },
        ]}
        selected={selectedStyle}
        onChange={handleChange}
        id="paragraph-style-button"
      />
    ),
    htmlMode: <IconButton onClick={toggleHtmlMode}><Icons.CodeIcon /></IconButton>,
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