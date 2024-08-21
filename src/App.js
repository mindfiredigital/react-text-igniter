import React from "react";
import RichTextEditor from "./components/richTextEditor";
import featuresData from "./assets/feature.json";
const App = () => {
  const features = Object.keys(featuresData.features);

  return <RichTextEditor features={features} height={"100px"}/>;
};

export default App;
