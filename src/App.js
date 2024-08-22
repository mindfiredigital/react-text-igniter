// App.js

import React, { useRef } from "react";
import RichTextEditor from "./components/richTextEditor";
import featuresData from "./assets/feature.json";

const App = () => {
  const editorRef = useRef();
  const features = Object.keys(featuresData.features);

  const handleGetContent = () => {
    console.log('HTML:', editorRef.current.getHtml());
    console.log('JSON:', editorRef.current.getJson());
  };

  return (
    <div>
      <RichTextEditor
        ref={editorRef}
        features={features}
        height="400px"
      />
      <button onClick={handleGetContent}>Get Content</button>
    </div>
  );
};

export default App;