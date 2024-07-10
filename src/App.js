import React from "react";
import RichTextEditor from "./components/RichTextEditor.jsx";
import featuresData from "./assets/features.json";
const App = () => {
  const features = Object.keys(featuresData.features);

  return <RichTextEditor features={features} />;
};

export default App;
