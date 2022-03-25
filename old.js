import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Routes, useParams, useNavigate} from "react-router-dom";

import "./styles.css";

// import Game from "./routes/game"
// import Leaderboard from "./routes/leaderboard"
// import Create from "./routes/create"
// import Join from "./routes/join"
// import Freindrdle from "./routes/friendrdle"

//https://www.youtube.com/watch?v=UjHT_NKR_gU&ab_channel=PedroTech


//no server for creation, front end handles creation by storing in url and then logs 

const BASE = "https://api.friendrdle.com"


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      letter:"A",
      data:null,
      error:false
    };
  }

  handleKeyDown(e) {
    this.setState({letter:e.key})
  }


  getGameData(gameID) {
    fetch("https://api.friendrdle.com/" + gameID)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        this.setState({error:true});
        return response.json()
      }
    })
    .then(json => this.setState({data:json}))
    .catch(error => console.log(error))
  }
  
  componentDidMount() {
    //window.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.getGameData(this.props.gameID);
  }

  componentWillUnmount() {
    //window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }


  render() {

    if (this.state.data == null && !this.state.error) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    else if (this.state.error) {
      return (
        <div>
          Game not found!
        </div>
      )
    }

    else {
      return (
        <div>
          {JSON.stringify(this.state.data)}
        </div>
      )
    }
  }
}


function GamePage() {
  //check headers for retriving the name (make the request from here)
  let params = useParams()
  return (
    <Game gameID={params.gameID} />
  )
}



class GameCreate extends React.Component {
  constructor(props) {

    //need on screen keyboard and event listner keyboard
    super(props);
    this.state = {};
  }
}





function Key(props) {

  function clicked() {
    props.onclick(props.letter)
  } 

  return (
    <div className="Key" onClick={clicked}>{props.letter}</div>
  )
}



function WarningBanner(props) {
  if (props.error === "null") {
    return null;
  }
  return (
    <div>
      <p>{props.error}</p>
    </div>
  )
}

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {letters:[""]}
  }

  onBackspace() {
    if (this.state.letters.length !== 1) {
      let newlist = [...this.state.letters]
      newlist.pop()
      this.setState({letters:newlist})
    }
    else {
      //equals one so set to blank
      this.setState({letters:[""]})
    }
  }

  onEnter() {
    //add in checks
    let word = this.state.letters.join("");

    if (word.length < 2) {
      this.setState({error:"Word must be greater than 2 characters."})
      return null;
    }
    else if (word.length > 10) {
      this.setState({error:"Word must be less than 10 characters"})
      return null;
    }
    
    for (let char of word) {
      if (!"QWERTYUIOPASDFGHJKLZXCVBNM".includes(char)) {
        this.setState({error: char + " is not a valid character"})
        return null;
      }
    }

    let body = {
      "word" : word,
      "guesses" : 6
    }

    fetch('https://api.friendrdle.com/create', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Server Error")
      }
      return response.json()
    })
    .then(data => {
      console.log("navy")
      let navigate = useNavigate()
      navigate("/game/" + data.gameID)
    })
    .catch((error) => {
      console.log(error)
      this.setState({"error":"Server Error"});
    });  
  }


  onChar(letter) {
    if (this.state.letters.length === 1 && this.state.letters[0] === "") {
      this.setState({letters:[letter]})
    }
    else (
      this.setState({letters:[...this.state.letters, letter]})
    )
  }

  render() {
    return (
      <div>
        <WarningBanner error={this.state.error}/>
        <div className="BoardRow">
          {this.state.letters.map((letter, i) => (
            <div key={i} className="Tile">{letter}</div>
          ))}
        </div>
        <KeyBoard onBackspace={this.onBackspace.bind(this)} onEnter={this.onEnter.bind(this)} onChar={this.onChar.bind(this)}/>
      </div>
    )
  }

}


//https://www.robinwieruch.de/react-hooks-fetch-data/

fetch("https://api.friendrdle.com/" + gameID)
.then(response => {
  if (response.ok) {
    return response.json()
  }
  else {
    this.setState({error:true});
    return response.json()
  }
})
.then(json => this.setState({data:json}))
.catch(error => console.log(error))



function GamePage() {
  //check headers for retriving the name (make the request from here)
  let params = useParams()
  return (
    <Game gameID={params.gameID} />
  )
}


function Board(props) {
  //takes the board as props
}



function getAllIndexes(str, val) {
  var indexes = [];

  for (let i = 0; i < str.length; i++)
      if (str[i] === val)
          indexes.push(i);
  return indexes;
}

og = "helllo"
test = "lllooo"


let char = "l"
let index = 0;

if (og.includes(char)) {
  let total = getAllIndexes(og, char).length;

  let sub = test.substring(0, index);
  let indexes = getAllIndexes(sub, char);

  if (total - indexes.length > 0) {
    //then it's yellow
  }
  else {
    //red cause exceeds the expected numbers
  }
  
}




for (let char of test) {
  if (og.includes(char)) {
    if (test.getAllIndexes())

  }
}

getAllIndexes(arr, val);



// function Game() {
//   let params = useParams()

//   const [data, setData] = useState(0);

//   useEffect(() => {
//     setData(null)
//     console.log(params.gameID);
//     fetch("https://api.friendrdle.com/" + params.gameID)
//     .then(response => response.json())
//     .then(data => this.setData({data}));
//   });

//   if (data == null) {
//     return (
//       <div>
//         <p>Loading...</p>
//       </div>
//     )
//   }
//   else {
//     return (
//       <div>
//         <p>{JSON.stringify(data)}</p>
//       </div>
//     )
//   }
// }



function Game(props) {
  const INCORRECT = "#ff3636"; //red
  const INCLUDES = "#fcff47"; //yellow
  const DEFAULT = "#dbdbdb"; //grey
  const CORRECT = "#54ff47"; //green

  //gamePage will have on finish callback when this is done.
  //some sort of finish callback

  const [data, setData] = useState({}); //{} info about the game
  const [board, setBoard] = useState([]); //board and the colors
  const [xIndex, setX] = useState(0); //current cursor position x
  const [yIndex, setY] = useState(0); //current cursor position y
  const [colors, setColors] = useState({}); //colors for the keyboard


  const params = useParams();

  function onLetter(letter) {
    console.log(yIndex);
    if (xIndex < data.word.length) {
      board[yIndex][xIndex][0] = letter;
      setBoard(board);
      setX(xIndex + 1);
    }
  }

  function onBackspace() {
    let copy = [...board];
    if (xIndex > 0) {
      copy[yIndex][xIndex-1][0] = ""; //does this change it? ?? is this valid?
      setBoard(copy);
      setX(xIndex-1);
    }
  }

  function onEnter() {
    //change the colors of the things
    //word list?
      
    let actual = data.word;
    let guess = "";

    for (let pair of board[yIndex]) {
      guess += pair[0];
    }

    if (guess.length !== actual.length) {
      //error not long enough
      return null;
    }

    setX(0);

    for (let i = 0; i < actual.length; i++) {
      let color = INCORRECT;
      //board[yIndex][i][1]
      if (guess[i] === actual[i]) {
        color = CORRECT; // green
      }

      else if (actual.includes(guess[i])) {
        //only color the number of yellows that are in the answwr
        let total = getAllIndexes(actual, guess[i]).length;
        let sub = guess.substring(0, xIndex);
        let indexes = getAllIndexes(sub, guess[i]);
      
        if (total - indexes.length > 0) {
          color = INCLUDES;
          //then it's yellow
        }
        else {
          color = INCORRECT;
          //red cause exceeds the expected numbers
        }
      }

      const colorMap = {} //https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
      colorMap[board[yIndex][i][0]] = color;

      setColors(colorMap)
      board[yIndex][i][1] = color;

    }
    setBoard(board);
    setY(yIndex + 1);
  }
  

  useEffect(() => {
      //when new data is set.
      if (Object.keys(data).length === 0) {
          return null;
      }

      let b = []

      for (let y = 0; y < data.guesses; y++) {
          let row = []
          for (let x = 0; x < data.word.length; x++) {
              row.push(["", DEFAULT]); //[letter, color]
          }
          b.push(row)
      }

      setBoard(b)

  }, [data]);


  useEffect(() => {
      //https://devtrium.com/posts/async-functions-useeffect
      //https://devtrium.com/posts/async-functions-useeffect
      
      const startGame = async () => {
          // get the data from the api
          const result = await fetch(BASE + "/d33b3990-75af-4308-9f08-56f4b645523b");
          const json = await result.json();
          
          setData(json);
          console.log(data)
      }

      startGame();
      }, []);



  return (
    <div>
      <Board board={board}></Board>
      <KeyBoard colors={colors} onEnter={onEnter} onBackspace={onBackspace} onLetter={onLetter}/>
    </div>
  )
}



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game/create" element={<Create />} />
      <Route path="/game/:gameID" element={<GameCreate />} />

    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);



const BASE = "https://api.friendrdle.com"

function getEmptyBoard(word, guesses){
  let board = []
  for (let y = 0; y < guesses; y++) {
    let row = []
    for (let x = 0; x < word.length; x++) {
        row.push(["", null]); //[letter, color]
    }
    board.push(row)
  }  
  return board;
}


    
let guess = this.state.board[this.state.y].join("")
let actual = this.state.word;

if (guess.length !== actual.length) {
  //error not long enough
  return null;
}

let newState = {...this.state}
newState.x = 0;


for (let i = 0; i < actual.length; i++) {
  let color = RED;
  //board[yIndex][i][1]
  if (guess[i] === actual[i]) {
    color = GREEN; // green
  }

  else if (actual.includes(guess[i])) {
    //only color the number of yellows that are in the answwr
    let total = getAllIndexes(actual, guess[i]).length;
    let sub = guess.substring(0, xIndex);
    let indexes = getAllIndexes(sub, guess[i]);
  
    if (total - indexes.length > 0) {
      color = YELLOW;
      //then it's yellow
    }
    else {
      color = RED;
      //red cause exceeds the expected numbers
    }
  }

  newState.colors
  const colorMap = {} //https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
  colorMap[board[yIndex][i][0]] = color;

  setColors(colorMap)
  board[yIndex][i][1] = color;

}
setBoard(board);
setY(yIndex + 1);