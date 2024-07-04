import React, { useState, useEffect, useRef } from 'react';
import "../styles/RichTextEditor.css";
import * as Icons from "../assets/Icons.jsx";

const RichTextEditor = ({ features }) => {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const editor = editorRef.current;

    const handleClick = (event) => {
      const blocks = editor.querySelectorAll('.editor-block');
      blocks.forEach((block) => block.classList.remove('active'));
      if (event.target.classList.contains('editor-block')) {
        event.target.classList.add('active');
      }
    };

    const handleInput = () => {
      const text = editor.innerText || '';
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      setCharCount(text.length);

      const blocks = editor.querySelectorAll('.editor-block');
      blocks.forEach(updateDataAttributes);

      // Ensure at least one editor block is always present
      if (blocks.length === 0) {
        const newBlock = document.createElement('div');
        newBlock.className = 'editor-block';
        newBlock.setAttribute('contentEditable', 'true');
        newBlock.setAttribute('data-type', 'normal');
        newBlock.setAttribute('placeholder', 'Start typing...');
        editor.appendChild(newBlock);
        newBlock.focus();
      }
    };

    editor.addEventListener('click', handleClick);
    editor.addEventListener('input', handleInput);

    return () => {
      editor.removeEventListener('click', handleClick);
      editor.removeEventListener('input', handleInput);
    };
  }, []);

  const updateDataAttributes = (block) => {
    const styles = window.getComputedStyle(block);
    const fontWeight = styles.getPropertyValue('font-weight');
    const fontStyle = styles.getPropertyValue('font-style');
    const textDecoration = styles.getPropertyValue('text-decoration');

    let dataType = [];
    if (fontWeight === 'bold' || fontWeight >= 600) dataType.push('bold');
    if (fontStyle === 'italic') dataType.push('italic');
    if (textDecoration.includes('underline')) dataType.push('underline');

    block.setAttribute('data-type', dataType.join('-') || 'normal');
  };

  const formatText = (command, value = null) => {
    const activeBlock = document.querySelector('.editor-block.active');
    if (activeBlock) {
      activeBlock.focus();
      document.execCommand(command, false, value);

      // Directly modify the data-type attribute based on command
      const currentDataType = activeBlock.getAttribute('data-type') || 'normal';
      const currentStyles = currentDataType.split('-');
      let newStyles = [];

      if (command === 'bold') {
        if (currentStyles.includes('bold')) {
          newStyles = currentStyles.filter(style => style !== 'bold');
        } else {
          newStyles = [...currentStyles, 'bold'];
        }
      } else if (command === 'italic') {
        if (currentStyles.includes('italic')) {
          newStyles = currentStyles.filter(style => style !== 'italic');
        } else {
          newStyles = [...currentStyles, 'italic'];
        }
      } else if (command === 'underline') {
        if (currentStyles.includes('underline')) {
          newStyles = currentStyles.filter(style => style !== 'underline');
        } else {
          newStyles = [...currentStyles, 'underline'];
        }
      }

      activeBlock.setAttribute('data-type', newStyles.join('-') || 'normal');
    }
  };

  const getHtml = () => {
    const editorContent = editorRef.current.innerHTML;
    console.log(editorContent);
  };

  const getJson = () => {
    const blocks = [];
    const editorBlocks = editorRef.current.querySelectorAll('.editor-block');

    editorBlocks.forEach((block) => {
      let type = 'text';
      let content = block.innerHTML;
      let level = null;
      let format = block.getAttribute('data-type') || 'normal';

      if (block.nodeName.match(/^H[1-6]$/)) {
        type = 'heading';
        level = parseInt(block.nodeName.charAt(1));
      }

      if (block.querySelector('img')) {
        type = 'image';
        const img = block.querySelector('img');
        content = {
          src: img.src,
          alt: img.alt,
          caption: block.textContent.replace(img.alt, '').trim()
        };
      }

      blocks.push({
        type: type,
        content: content,
        level: level,
        format: format
      });
    });

    const jsonContent = JSON.stringify({
      version: '1.0.0',
      time: Date.now(),
      blocks: blocks,
    }, null, 2);

    console.log(jsonContent);
  };

  const featureButtons = {
    bold: <button onClick={() => formatText('bold')} id="boldBtn"><Icons.BoldIcon/></button>,
    italic: <button onClick={() => formatText('italic')} id="italicBtn"><Icons.ItalicIcon/></button>,
    underline: <button onClick={() => formatText('underline')} id="underlineBtn"><Icons.UnderlineIcon/></button>,
    orderedList: <button onClick={() => formatText('insertOrderedList')}><Icons.OrderedListIcon/></button>,
    unorderedList: <button onClick={() => formatText('insertUnorderedList')}><Icons.UnOrderedListIcon/></button>,
    alignLeft: <button onClick={() => formatText('justifyLeft')}><Icons.AlignLeftIcon/></button>,
    alignCenter: <button onClick={() => formatText('justifyCenter')}><Icons.AlignCenterIcon/></button>,
    alignRight: <button onClick={() => formatText('justifyRight')}><Icons.AlignRightIcon/></button>,
    createLink: <button onClick={() => {
      const url = prompt('Enter the URL');
      formatText('createLink', url);
    }}><Icons.LinkIcon/></button>,
    insertImage: <button onClick={() => {
      const url = prompt('Enter the image URL');
      formatText('insertImage', url);
    }}><Icons.ImageIcon/></button>,
    getHtml: <button onClick={getHtml}>Get HTML</button>,
    getJson: <button onClick={getJson}>Get JSON</button>,
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            {featureButtons[feature]}
          </React.Fragment>
        ))}
      </div>
      <div id="editor" ref={editorRef} contentEditable="true">
        <div className="editor-block" contentEditable="true" data-type="normal" placeholder="Start typing..."></div>
      </div>
      <div className="editor-footer">
        <span>Words: {wordCount}</span> | <span>Chars: {charCount}</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
