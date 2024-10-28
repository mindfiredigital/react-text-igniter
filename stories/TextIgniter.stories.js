import React, { useRef } from "react";
import { TextIgniter } from "../component";

export default {
  title: "TextIgniter",
  component: TextIgniter,
  argTypes: {
    features: {
      control: "object",
      description: "Features to enable in the editor",
    },
    height: {
      control: "text",
      description: "Height of the editor",
    },
    defaultContent: {
      control: "text",
      description: "Default content for the editor",
    },
    onChange: {
      control: Function,
      description: "Callback function for editor content change",
    },
  },
};

console.log("here");
// Template for all stories
const Template = (args) => {
  const editorRef = useRef();
  console.log("line 23 here");

  const handleGetContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const json = editorRef.current.getJson();
      console.log("HTML Content:", html);
      console.log("JSON Content:", json);
    }
  };

  return (
    <div>
      <TextIgniter ref={editorRef} {...args} />
      <button onClick={handleGetContent} style={{ marginTop: "10px" }}>
        Get Content
      </button>
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  features: ["bold", "italic", "underline"],
  height: "300px",
  defaultContent: "",
  onChange: undefined
};

// Story with more features
export const FullFeatured = Template.bind({});
FullFeatured.args = {
  features: [
    "heading",
    "bold",
    "italic",
    "underline",
    "orderedList",
    "unorderedList",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "createLink",
    "insertImage",
    "superscript",
    "subscript",
    "table",
    "layout",
  ],
  height: "400px",
};

// Story with custom height
export const CustomHeight = Template.bind({});
CustomHeight.args = {
  ...Default.args,
  height: "500px",
};


// Story with default content
export const DefaultContent = Template.bind({});
DefaultContent.args = {
  features: [
    "heading",
    "bold",
    "italic",
    "underline",
    "orderedList",
    "unorderedList",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "createLink",
    "insertImage",
    "superscript",
    "subscript",
    "table",
    "layout",
  ],
  height: "400px",
  defaultContent: "<p>Opening <b>default HTML</b> content</p>",
};

// Story with defaultContent & onChange callback
export const OnChangeCallback = Template.bind({});
OnChangeCallback.args = {
  features: [
    "heading",
    "bold",
    "italic",
    "underline",
    "orderedList",
    "unorderedList",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "createLink",
    "insertImage",
    "superscript",
    "subscript",
    "table",
    "layout",
  ],
  height: "400px",
  defaultContent: "<p>Opening <b>default HTML</b> content and watch console to see if onChange callback is triggered</p>",
  onChange: (val) => { console.log("onChange", val) }
};