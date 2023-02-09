import { useEffect, useState } from "react"

import CONFIG from "../config";

import KeyBoard from "./Keyboard";
import AlertBox from "./AlertBox";
import GamerOver from "./GameOver";
import {Board, getEmptyBoard, CellState} from "./Board"


function Game(props) {  
    /*props:
        alert : str or null (initaial alert)
        word : str (the word)
        wordlist : set or null (list of valid words)
        attempts: int (number of attempts) 
        code : game code (base64 encoded string)
    */

    //alert stuff
    const [alert, setAlert] = useState(props.alert);
    //game stuff
    const [board, setBoard] = useState(getEmptyBoard(props.word, props.attempts));
    const [cursor, setCursor] = useState({x : 0, y : 0});
    const [keyColors, setKeyColors] = useState({}); // control key state 
    //gameover stuff
    const [winStatus, setWinStatus] = useState(null);


    function getShareableLink() {
        //return sms share link 
        const NEW_LINE = "%0a"
        let link = "sms:?&body=";
        link += "Friendrdle" + NEW_LINE

        for (let y = 0; y <= cursor.y; y++) {
            let row = board[y];
            for (let cell of row) {
                switch(cell.state) {
                    case CellState.EMPTY:
                        link += "⬜"
                        break;
                    case CellState.WRONG:
                        link += "🟥"
                        break;
                    case CellState.RIGHT:
                        link += "🟩"
                        break;
                    case CellState.CLOSE:
                        link += "🟨"
                        break;
                }
            }
            link += NEW_LINE
        }
        link += `Code: ${props.code}`
        return link
    }


    function onEnter() {
        //logic for when enter key is pressed
        //only advance cursor row when row is filled
        if (cursor.x < props.word.length) {
            setAlert("Must fill row to enter")
            return;
        }
        
        //check to make sure it's in the wordlist if setting is enabled
        if (props.wordlist !== null) {
            let input = "";
            for (let data of board[cursor.y]) {
                input += data.character;
            }

            if ( (input !== props.word) && (!props.wordlist.has(input)) )  {
                setAlert(`${input} is not a valid word`)
                return;
            }
        }

        //log how many times each letter occurs in the original word
        let occurances = {}; 
        for (let letter of props.word) {
            if (letter in occurances) {
                occurances[letter] += 1;
            }
            else {
                occurances[letter] = 1;
            }
        }


        setAlert(null);
        //set of the cells that need to be updated
        const cellsToUpdate = new Set(); //cells to be updated 
        
        for (let x = 0; x < props.word.length; x++) {
            cellsToUpdate.add(x)
        }
        //color the correct guesses green
        for (let x of cellsToUpdate) {
            const guess = board[cursor.y][x].character;
            const actual = props.word[x];

            if (guess === actual) {
                cellsToUpdate.delete(x);
                occurances[guess] -= 1;
                updateCell(x, cursor.y, {state : CellState.RIGHT});
            }
        }

        //user guessed all correct, end game and return
        if (cellsToUpdate.size === 0) {
            setWinStatus(true);
            return;
        }

        //color the yellow tiles
        for (let x of cellsToUpdate) {
            const guess = board[cursor.y][x].character;
            //if still occurs after dealing with correct, 
            //color it yellow and subtracrt an occurance to not do more yellow than there are
            if (occurances[guess] > 0) {
                updateCell(x, cursor.y, {state : CellState.CLOSE})
                occurances[guess] -= 1;
                cellsToUpdate.delete(x);
            }
        }

        //color the wrong tiles red 
        for (let x of cellsToUpdate) {
            updateCell(x, cursor.y, {state : CellState.WRONG})
        }
        //if the last row, end the game
        if (cursor.y + 1 == parseInt(board.length)) {
            setWinStatus(false);
            return;
        }
        //update the cursor to the next row
        setCursor({y : cursor.y + 1, x : 0})
    }


    function onBackspace() {
        //logic for backspace press
        //only backspace when cursor is at position greater than zero in row.
        if (cursor.x > 0) {
            setCursor({...cursor, x : cursor.x - 1})
            updateCell(cursor.x - 1, cursor.y, {character : ""});
        }
    }

    function updateCell(x, y, data) {
        /* 
        {
            state : CellState
            character : String
        }
        */
        const newBoard = [...board];
        newBoard[y][x] = {...newBoard[y][x], ...data};
        setBoard(newBoard);
    }

    function onLetter(letter) {
        //logic for letter input

        //letter input cant exceed length of original word
        if (cursor.x >= props.word.length) {
            return;
        }
        
        updateCell(cursor.x, cursor.y, {character : letter});
        setCursor({...cursor, x : cursor.x + 1});
    }
    

    function onKeyPress(event) {
        //handle key press events from on screen adn physical keyboard
        if (winStatus !== null) {
            console.log("game is over not acting on key presses")
            return; //game is over so don't log keys anymore
        }

        if (event.key === "Backspace") {
            onBackspace();
        }
        else if (event.key === "Enter") {
            onEnter();
        }
        else {
            const key = event.key.toUpperCase();
        
            if (CONFIG.CHARACTER_SET.has(key)) {
                onLetter(key)
                //on letter 
            }
            else {
                setAlert(`${key} is not a valid letter`)
            }
        }
    }


    useEffect(() => {
        document.addEventListener("keydown", onKeyPress);    
        return () => {document.removeEventListener("keydown", onKeyPress)}
      }, [cursor, winStatus])


    return (
        <div className="center-col">
            <AlertBox 
                msg={alert}
                close={() => setAlert(null)}
            />
            <Board board={board}/>
            {winStatus !== null && (
                <GamerOver 
                    attempts={cursor.y + 1}
                    won={winStatus}
                    word={props.word}
                    shareURL={getShareableLink()} //does not need to be callback because only runs when conditional is true
                />
            )} 
            <KeyBoard 
                onKeyPress={onKeyPress}
                keyColors={keyColors}
            />
        </div>
    )
}


export default Game;