import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {Board} from "./basic/board"
import {KeyBoard} from "./basic/keyboard"
import {WORDLIST} from "./wordlist"

import Message from "./utils"

const RED = "#ff3636"; //red
const YELLOW = "#fcff47"; //yellow
const GREY = "#dbdbdb"; //grey
const GREEN = "#54ff47"; //green

function GamePage() {


    const params = useParams();
    const [data, setData] = useState(null);
    const [gameID, setGameId] = useState("");

    useEffect(() => {
        async function getData() {
            let resp = await fetch("https://api.friendrdle.com" + "/" + params.gameID)
            if (resp.status >= 200 && resp.status < 400) {
                const data = await resp.json()
                return data;
            }
            console.log("Error getting data!") 
        }
        
        getData()
        .then(json => setData(json));
        setGameId(params.gameID);
      }, []); // Only re-run the effect if count changes

      
    return (
        <div>
            {data !== null && (
                <Game {...data} gameID={gameID}/>
            )}
            {data === null && (
                <p>Loading...</p>
            )}
        </div>
    )
    
}


function getAllIndexes(str, val) {
    var indexes = [];
  
    for (let i = 0; i < str.length; i++)
        if (str[i] === val)
            indexes.push(i);
    return indexes;
} 




class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board:this.getEmptyBoard(),
      colors:{},
      error: "Some msg here",
      finished: false,
      message: ""
    }
    this.x = 0;
    this.y = 0;
  }


  getEmptyBoard(word, guesses){
    let board = []
    for (let y = 0; y < this.props.guesses; y++) {
      let row = []
      for (let x = 0; x < this.props.word.length; x++) {
          row.push(["", GREY]); //[letter, color]
      }
      board.push(row)
    }  
    return board;
  }


  onLetter(letter) {
    if (this.x < this.props.word.length) {
      let newBoard = [...this.state.board]
      newBoard[this.y][this.x][0] = letter;
      this.x += 1;
      this.setState({board:newBoard});
    }
  }

  
  onBackspace() {
    if (this.x > 0) {
      let newBoard = [...this.state.board];
      newBoard[this.y][this.x-1][0] = "";
      this.x -= 1;
      this.setState({board:newBoard});
    }
  }


  onEnter() {
    //change the colors of the things
    //word list?    

    let guess = ""
    for (let pair of this.state.board[this.y]) {
      guess += pair[0]
    }

    let actual = this.props.word;

    if (guess.length !== actual.length) {
      //error not long enough
      this.setState({error:"Must be " + actual.length + " characters"});
      return null;
    }
    if (guess !== actual && (!WORDLIST.has(guess))) {
      this.setState({error:guess + " is not a valid word"})
      //console.log("Not in wordlist")
      return null;
    }

    this.x = 0;
    let newColors = {...this.state.colors}
    let newBoard = [...this.state.board]

    for (let i = 0; i < actual.length; i++) {
      let color = RED;
      //board[yIndex][i][1]
      if (guess[i] === actual[i]) {
        color = GREEN; // green
      }

      else if (actual.includes(guess[i])) {
        //only color the number of yellows that are in the answwr
        let total = getAllIndexes(actual, guess[i]).length;
        let sub = guess.substring(0, this.x);
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
      if (color === RED) {
        newColors[this.state.board[this.y][i][0]] = color //store the color values for the keyboard
      }
      newBoard[this.y][i][1] = color;
    }
    
    let numGreen = 0;
    for (let item of this.state.board[this.y]) {
      if (item[1] === GREEN) {
        numGreen += 1;
      }
    }

    if (numGreen === this.props.word.length) {
      this.setState({finished:true});
      this.setState({message:"Congrats"});
    }
    else if (this.y + 1 === this.props.guesses) {
      this.setState({finished:true})
      this.setState({message:"You Failed Friendrdle. The word was " + this.props.word});
    }
 
    this.y += 1;
    this.setState({colors:newColors, board:newBoard});
  }
  

  getShareLink() {
    let link = "sms:?&body=Friendrdle%0a";
    for (let i = 0; i < this.y; i++) {
      let row = this.state.board[i];
      for (let col of row) {
        if (col[1] === RED) {
          link += "🟥";
        }
        else if (col[1] === GREEN) {
          link += "🟩";
        }
        else {
          link += "🟨";
        }
      }
      link += "%0a"
    }
    link += "https://www.friendrdle.com/" + this.props.gameID;
    return link
  }


  render() {
    return (
      <div className="game">
        <div className="title">
            <img className="title-img"></img>
            <h1 className="title-text">Friendrdle</h1>
            <img className="title-img"></img>
        </div>
        <Board board={this.state.board} error={this.state.error}></Board>
        {this.state.finished && (
          <div className="finished">
            <p>{this.state.message}</p>
            <a className="share-button" href={this.getShareLink()}>Share</a>
          </div>
        )}
        {!this.state.finished && (
          <KeyBoard colors={this.state.colors} onEnter={this.onEnter.bind(this)} onBackspace={this.onBackspace.bind(this)} onLetter={this.onLetter.bind(this)}/>
        )}
      </div>
    )
  }
}


export {GamePage}


/*


*/