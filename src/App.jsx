import { useState } from "react";
import Navbar from "./components/Navbar";
import ItemGallery from "./components/ItemGallery";
import Card from "./components/Card";

function App() {
  return (
    <div className="flex flex-col items-center justify-center font-display ">
      <Navbar />
      <div className="flex justify-center">
        <ItemGallery />
        <Card />
      </div>
    </div>
  );
}

export default App;
