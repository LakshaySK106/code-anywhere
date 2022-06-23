import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Ide from "./components/Ide/Ide";
import { Toaster } from 'react-hot-toast';
import './App.scss';

function App() {
  return (
    <>
      <div className="toast">
        <Toaster pposition="top-center"
          toastOptions={{
            success: {
              style: {
                background: '0',
                border: '1px solid #4e4a85',
                borderRadius: '3px',
                color: '#4e4a85',
                fontSize: '13px',
                letterSpacing: '1px',
              },
            },
          }}>
        </Toaster>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ide/:roomId" element={<Ide />} />
      </Routes>
    </>
  );
}

export default App;
