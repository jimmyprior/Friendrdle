import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Routes} from "react-router-dom";

import "./styles.css";

import {Game} from './routes/game'

const red = "#ff0000"
const green = "#00ff00"
const blue = "#0000ff"

const b = [
  [["B", red], ["B", red], ["S", red], ["F", blue], ["S", red], ["F", blue]],
  [["B", red], ["S", green], ["B", red], ["E", red], ["S", red], ["F", blue]],
  [["B", red], ["P", green], ["H", green], ["Q", red], ["S", red], ["F", blue]],
  [["B", green], ["B", red], ["Y", red], ["B", red], ["S", red], ["F", blue]],
  [["B", red], ["B", blue], ["B", blue], ["B", red], ["S", red], ["F", blue]]
]


ReactDOM.render(
  <Game word="JIMMY" guesses={5}/>,
  document.getElementById('root')
);