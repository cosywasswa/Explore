import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Missions from "./components/missions";
import Myprofile from "./components/myprofile";
import Rockets from "./components/rockets";

function App() {
  return (
    <>
    <Navbar />
    <div className="App">
     
      <Routes>
          <Route path="/" element={<Rockets />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Routes>
     
    </div>
    </>
  );
}

export default App;
