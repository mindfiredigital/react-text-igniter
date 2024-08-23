import React, { useRef } from 'react';
import { RichTextEditor } from '../component';

export default {
  title: 'RichTextEditor',
  component: RichTextEditor,
  argTypes: {
    features: {
      control: 'object',
      description: 'Features to enable in the editor',
    },
    height: {
      control: 'text',
      description: 'Height of the editor',
    },
  },
};

console.log("here");
// Template for all stories
const Template = (args) => {
  const editorRef = useRef(null);
console.log("line 23 here");

  const handleGetContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const json = editorRef.current.getJson();
      console.log('HTML Content:', html);
      console.log('JSON Content:', json);
    }
  };

  return (
    <div>
     <RichTextEditor ref={editorRef} {...args} />
      {/*<button onClick={handleGetContent} style={{ marginTop: '10px' }}>
        Get Content
      </button> */}
      <p>hellow world</p>
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  features: ['bold', 'italic', 'underline'],
  height: '300px',
};

// Story with more features
export const FullFeatured = Template.bind({});
FullFeatured.args = {
  features: ['bold', 'italic', 'underline'],
  height: '400px',
};

// Story with custom height
export const CustomHeight = Template.bind({});
CustomHeight.args = {
  ...Default.args,
  height: '500px',
};