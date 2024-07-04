import React from 'react';
import RichTextEditor from "./components/RichTextEditor.jsx";
const App = () => {
  const features = [
    'bold', 'italic', 'underline', 'orderedList', 'unorderedList',
    'alignLeft', 'alignCenter', 'alignRight', 'createLink', 'insertImage', 'getHtml', 'getJson'
  ];

  return (
      <RichTextEditor features={features} />
  );
};

export default App;
