import React from 'react';
import { EditorProvider, useEditor } from '../config/EditorContext.jsx';
import "../styles/RichTextEditor.css";
import * as Icons from "../assets/Icons.jsx";

// Toolbar component to display and manage editor features
const Toolbar = ({ features }) => {
  const { formatText, editorRef } = useEditor(); // Accessing editor state and actions from editor context

  // Handles feature button clicks, triggering formatting actions in the editor
  const handleFeatureClick = (command, value = null) => {
    formatText(command, value); // Invokes formatting action based on the command and optional value
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
    bold: <button onClick={() => handleFeatureClick('bold')} id="boldBtn"><Icons.BoldIcon /></button>,
    italic: <button onClick={() => handleFeatureClick('italic')} id="italicBtn"><Icons.ItalicIcon /></button>,
    underline: <button onClick={() => handleFeatureClick('underline')} id="underlineBtn"><Icons.UnderlineIcon /></button>,
    orderedList: <button onClick={() => handleFeatureClick('insertOrderedList')}><Icons.OrderedListIcon /></button>,
    unorderedList: <button onClick={() => handleFeatureClick('insertUnorderedList')}><Icons.UnOrderedListIcon /></button>,
    alignLeft: <button onClick={() => handleFeatureClick('justifyLeft')}><Icons.AlignLeftIcon /></button>,
    alignCenter: <button onClick={() => handleFeatureClick('justifyCenter')}><Icons.AlignCenterIcon /></button>,
    alignRight: <button onClick={() => handleFeatureClick('justifyRight')}><Icons.AlignRightIcon /></button>,
    createLink: <button onClick={() => {
      const url = prompt('Enter the URL');
      handleFeatureClick('createLink', url);
    }}><Icons.LinkIcon /></button>,
    insertImage: <button onClick={() => {
      const url = prompt('Enter the image URL');
      formatText('insertImage', url);
    }}><Icons.ImageIcon /></button>,
    getHtml: <button onClick={() => console.log(editorRef.current.innerHTML)}>Get HTML</button>,
    getJson: <button onClick={getJson}>Get JSON</button>
  };

  // Renders the toolbar with mapped feature buttons
  return (
    <div className="toolbar">
      {features.map((feature, index) => (
        <React.Fragment key={index}>
          {featureButtons[feature]}
        </React.Fragment>
      ))}
    </div>
  );
};

// Editor component for rich text editing with word and character count
const Editor = () => {
  const { editorRef, wordCount, charCount } = useEditor();

  return (
    <>
      <div id="editor" ref={editorRef} contentEditable="true">
        <div className="editor-block" contentEditable="true" data-type="normal" placeholder="Start typing..."></div>
      </div>
      <div className="editor-footer">
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
