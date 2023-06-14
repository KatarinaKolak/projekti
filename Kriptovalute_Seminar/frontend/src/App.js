import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import Explorer from './Explorer';
import TxDetails from './TxDetails';
import BlockDetails from './BlockDetails';
import BlockByHash from './BlockByHash'
import NavbarMenu from './Navbar';
import Blockchain from './Blockchain';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <NavbarMenu />
          <Routes>
            <Route path="/" element={<Explorer />} />
            <Route path="/tx/:id" element={<TxDetails />} />
            <Route path="/block/:id" element={<BlockDetails />} />
            <Route path="/blockByHash/:id" element={<BlockByHash />} />
            <Route path="/blockchain" element={<Blockchain />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

