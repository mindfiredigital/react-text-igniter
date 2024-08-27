import React, { useState } from "react";
import { useEditor } from "../../contexts/editorContext.jsx";
import * as Icons from "../../assets/icon.jsx";
import { IconButton } from "../ui/Button.jsx";
import { ImageUploadSelectionDialog, FileUrlDialog } from "../ui/Dialog.jsx";
import { IconDropDown } from "../ui/Dropdown.jsx";
import { usePreviewMode } from "../../hooks/usePreviewMode.jsx";
const Toolbar = ({ features }) => {
  const {
    formatText,
    insertTable,
    addTableRow,
    addTableColumn,
    insertLayout,
    addImageOrVideo,
    addLink,
    activeStyles,
    changeHeading,
    applyHeading,
  } = useEditor();

  const { isToolbarVisible, toggleToolbarVisibility } = usePreviewMode();

  const [isImageDialogOpen, setImageDialogOpen] = useState(false);
  const [isUrlDialogOpen, setUrlDialogOpen] = useState(false);


  const handleImageSubmit = ({ file, fileUrl }) => {
    addImageOrVideo(file, fileUrl);
  };
  const handleHeadingChange = (e) => {
    const heading = e;
    changeHeading(heading);
    applyHeading(heading);
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

  const getIsActive = (style) => activeStyles.includes(style);

  const featureButtons = {
    bold: <IconButton onClick={() => formatText("bold")} toolTip="Bold" isActive={getIsActive('bold')}><Icons.BoldIcon /></IconButton>,
    italic: <IconButton onClick={() => formatText("italic")} toolTip="Italic" isActive={getIsActive('italic')}><Icons.ItalicIcon /></IconButton>,
    underline: <IconButton onClick={() => formatText("underline")} toolTip="Underline" isActive={getIsActive('underline')}><Icons.UnderlineIcon /></IconButton>,
    orderedList: <IconButton onClick={() => formatText("insertOrderedList")} toolTip="Ordered List" isActive={getIsActive('orderedList')}><Icons.OrderedListIcon /></IconButton>,
    unorderedList: <IconButton onClick={() => formatText("insertUnorderedList")} toolTip="Unordered List" isActive={getIsActive('unorderedList')}><Icons.UnOrderedListIcon /></IconButton>,
    justifyLeft: <IconButton onClick={() => formatText("justifyLeft")} toolTip="Justify Left" isActive={getIsActive('justifyLeft')}><Icons.AlignLeftIcon /></IconButton>,
    justifyCenter: <IconButton onClick={() => formatText("justifyCenter")} toolTip="Justify Center" isActive={getIsActive('justifyCenter')}><Icons.AlignCenterIcon /></IconButton>,
    justifyRight: <IconButton onClick={() => formatText("justifyRight")} toolTip="Justify Right" isActive={getIsActive('justifyRight')}><Icons.AlignRightIcon /></IconButton>,
    createLink: (
      <>
        <IconButton onClick={() => setUrlDialogOpen(true)} toolTip="Create Link" isActive={getIsActive('createLink')}><Icons.LinkIcon /></IconButton>
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
        <IconButton onClick={() => setImageDialogOpen(true)} toolTip="Insert Image/Video" isActive={getIsActive('insertImage')}><Icons.ImageIcon /></IconButton>
        <ImageUploadSelectionDialog
          isOpen={isImageDialogOpen}
          onClose={() => setImageDialogOpen(false)}
          title="Select Image/Video file"
          onSubmit={handleImageSubmit}
        />
      </>
    ),
    superscript: <IconButton onClick={() => formatText("superscript")} toolTip="Superscript" isActive={getIsActive('superscript')}><Icons.SuperScriptIcon /></IconButton>,
    subscript: <IconButton onClick={() => formatText("subscript")} toolTip="Subscript" isActive={getIsActive('subscript')}><Icons.SubScriptIcon /></IconButton>,
    table: (
      <IconDropDown
        id="tableDropdown"
        icon={<Icons.TableIcon />}
        toolTip={"Table"}
        items={[
          { value: "insert", label: "Insert Table" },
          { value: "addRow", label: "Add Row" },
          { value: "addColumn", label: "Add Column" },
        ]}
        onChange={handleTableOperation}
      />
    ),
    layout: (
      <IconDropDown
        id="layoutDropdown"
        icon={<Icons.LayoutIcon />}
        toolTip={"Layout"}
        items={[
          { value: "single", label: "Single Column" },
          { value: "two-equal", label: "Two Equal Columns"},
          { value: "three-equal", label: "Three Equal Columns" },
          { value: "40-60", label: "40-60"},
          { value: "60-40", label: "60-40" },
        ]}
        onChange={handleLayoutOperation}
      />
    ),
    heading: (
      <IconDropDown
      icon={<Icons.HeadingIcon />}
      items={[
          { value: "h1", label: "Heading 1", },
          { value: "h2" , label: "Heading 2"},
          {  value: "h3", label: "Heading 3" },
          { value: "h4" ,label: "Heading 4"},
          { value: "h5" , label: "Heading 5"},
          {value: "h6", label: "Heading 6" },
        ]}
        onChange={handleHeadingChange}
        toolTip={"Headings"}
      />
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
      { !isToolbarVisible &&
        features.map((feature, index) => (
          <React.Fragment key={index}>{featureButtons[feature]}</React.Fragment>
        ))}
    </div>
  );
};

export default Toolbar;