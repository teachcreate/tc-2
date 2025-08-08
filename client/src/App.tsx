import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PreLaunch from './pages/PreLaunch';
import MyToolkit from './pages/MyToolkit';
import Cart from './pages/Cart';
import CreatorPortal from './pages/CreatorPortal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prelaunch" element={<PreLaunch />} />
          <Route path="/mytoolkit" element={<MyToolkit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/creatorportal" element={<CreatorPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
