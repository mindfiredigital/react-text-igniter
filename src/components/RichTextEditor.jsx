import React,{useState,useEffect} from 'react';
import { EditorProvider, useEditor } from '../config/EditorContext.jsx';
import "../styles/RichTextEditor.css";
import * as Icons from "../assets/Icons.jsx";
import featuresData from '../assets/features.json';

// Toolbar component to display and manage editor features
const Toolbar = ({ features }) => {
  const { formatText, editorRef, currentHeading, changeHeading, isHtmlMode, toggleHtmlMode, applyHeading } = useEditor(); // Accessing editor state and actions from editor context

  // Handles feature button clicks, triggering formatting actions in the editor
  const handleFeatureClick = (command, value = null) => {
    formatText(command, value); // Invokes formatting action based on the command and optional value
  };

  // Handles heading button clicks, triggering heading changes in the editor
  const handleHeadingChange = (e) => {
    const heading = e.target.value;
    changeHeading(heading);
    applyHeading(heading);
  };

  // Generates a JSON representation of the current editor content
  const getJson = () => {
    const blocks = [];
    const editorBlocks = editorRef.current.querySelectorAll('.editor-block');

    // Iterates through each editor block to extract content details
    editorBlocks.forEach((block) => {
      let type = 'text';
      let content = block.innerHTML;
      let level = null;
      let format = block.getAttribute('data-type') || 'normal';

      // Checks for image content and structures its representation
      if (block.querySelector('img')) {
        type = 'image';
        const img = block.querySelector('img');
        content = {
          src: img.src,
          alt: img.alt,
          caption: block.textContent.replace(img.alt, '').trim()
        };
      }

      // Constructs a block object and adds it to the blocks array
      blocks.push({
        type: type,
        content: content,
        level: level,
        format: format
      });
    });

    // Constructs and logs a JSON string with version, timestamp, and blocks
    const jsonContent = JSON.stringify({
      version: '1.0.0',
      time: Date.now(),
      blocks: blocks,
    }, null, 2);

    console.log(jsonContent); // Outputs JSON content to the console
  };

  // Defines buttons for each feature with corresponding click handlers
  const featureButtons = {
    bold: <button onClick={() => handleFeatureClick(featuresData.features.bold.tag)} id="boldBtn"><Icons.BoldIcon /></button>,
    italic: <button onClick={() => handleFeatureClick(featuresData.features.italic.tag)} id="italicBtn"><Icons.ItalicIcon /></button>,
    underline: <button onClick={() => handleFeatureClick(featuresData.features.underline.tag)} id="underlineBtn"><Icons.UnderlineIcon /></button>,
    orderedList: <button onClick={() => handleFeatureClick(featuresData.features.insertOrderedList.tag)}><Icons.OrderedListIcon /></button>,
    unorderedList: <button onClick={() => handleFeatureClick(featuresData.features.insertUnorderedList.tag)}><Icons.UnOrderedListIcon /></button>,
    alignLeft: <button onClick={() => handleFeatureClick(featuresData.features.justifyLeft.tag)}><Icons.AlignLeftIcon /></button>,
    alignCenter: <button onClick={() => handleFeatureClick(featuresData.features.justifyCenter.tag)}><Icons.AlignCenterIcon /></button>,
    alignRight: <button onClick={() => handleFeatureClick(featuresData.features.justifyRight.tag)}><Icons.AlignRightIcon /></button>,
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
    createLink: <button onClick={() => {
      const url = prompt('Enter the URL');
      handleFeatureClick('createLink', url);
    }}><Icons.LinkIcon /></button>,
    insertImage: <button onClick={() => {
      const url = prompt('Enter the image URL');
      formatText('insertImage', url);
    }}><Icons.ImageIcon /></button>,
    getHtml: <button onClick={() => console.log(editorRef.current.innerHTML)}>Get HTML</button>,
    getJson: <button onClick={getJson}>Get JSON</button>,
    superscript: <button onClick={() => handleFeatureClick(featuresData.features.superscript.tag)}><Icons.SuperScriptIcon /></button>,
    subscript: <button onClick={() => handleFeatureClick(featuresData.features.subscript.tag)}><Icons.SubScriptIcon /></button>,
    htmlMode: (
      <button onClick={toggleHtmlMode}>
        {isHtmlMode ? 'Normal Mode' : 'HTML Mode'}
      </button>
    ),
  };

  // Renders the toolbar with mapped feature buttons
  return (
    <div className="toolbar">
    {!isHtmlMode && features.map((feature, index) => (
      <React.Fragment key={index}>
        {featureButtons[feature]}
      </React.Fragment>
    ))}
  </div>
  );
};

// Editor component for rich text editing with word and character count
const Editor = () => {
  const { editorRef, wordCount, charCount, isHtmlMode, toggleHtmlMode } = useEditor();
  const [content, setContent] = useState('<div class="editor-block active" contenteditable="true" data-type="normal" placeholder="Start typing..."></div>');
  
  useEffect(() => {
    const editor = editorRef.current;
    if (!isHtmlMode && editor.innerHTML !== content) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startOffset = range.startOffset;
      const startContainer = range.startContainer;
  
      editor.innerHTML = content;
  
      if (startContainer.nodeType === Node.TEXT_NODE) {
        const newRange = document.createRange();
        newRange.setStart(editor.firstChild.firstChild, startOffset);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [isHtmlMode, content, editorRef]);

  const handleNormalModeChange = () => {
    const newContent = editorRef.current.innerHTML;
    if (newContent !== content) {
      setContent(newContent);
    }
  };

  const handleHtmlModeChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div 
        id="editor" 
        ref={editorRef} 
        contentEditable={!isHtmlMode}
        className={isHtmlMode ? 'html-mode' : ''}
        onInput={handleNormalModeChange}
        style={{ display: isHtmlMode ? 'none' : 'block' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {isHtmlMode && (
        <>
        <textarea
          className="html-editor"
          value={content}
          onChange={handleHtmlModeChange}
          style={{
            width: '100%',
            minHeight: '300px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            resize: 'vertical'
          }}
        />
        <button onClick={toggleHtmlMode}>
        {isHtmlMode ? 'Normal Mode' : 'HTML Mode'}
      </button>
        </>
      )}
      <div className="editor-footer" 
      style={{ display: isHtmlMode ? 'none' : 'block' }}>
        <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
      </div>
    </>
  );
};

const RichTextEditor = ({ features }) => (
  <EditorProvider>
    <div className="editor-container">
      <Toolbar features={features} />
      <Editor />
    </div>
  </EditorProvider>
);

export default RichTextEditor;
