import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Routes} from "react-router-dom";

import "./styles.css";

import {GamePage} from './routes/game'
import {CreatePage} from "./routes/create"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game/:gameID" element={<GamePage />} />
      <Route path="/" element={<CreatePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);