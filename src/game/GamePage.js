import {useLocation} from "wouter";
import { useState, useEffect } from "react";
import Game from "./Game"

import {fetchWordlist, getQueryParams, decodeGameData} from "../utils"



function GamePage() {
    //gets params and passed them to game component as props

    //url navigation
    const [location, setLocation] = useLocation();

    //game data from params 
    const [gameData, setGameData] = useState(null);

    const [wordlist, setWordlist] = useState(null)
  
  
    async function retrieveWordlist() {
        const list = await fetchWordlist();
        setWordlist(list);
    }
  
    useEffect(() => {
        //runs on component load (decodes the query params)
        //also gets dictioary wordlist 

        const params = getQueryParams()
        
        //rename data to game
        if (params.get("data") === null) {
            //if not data is provided 404
            setLocation("/404");
            return () => {}
        }
    
        const data = decodeGameData(params.get("data"));

        if (!data) {  
            //if the data is malformed throw 404 
            setLocation("/404");
            return () => {}
        }
    
        let clipboard = false;
        if (params.get("clipboard") !== null) {
            clipboard = true;
        }

        //dictionary is enabled so load it in
        if (data[2]) {
            retrieveWordlist(); //async so won't set immediately
        } 
        
        setGameData({
            word : data[0], //bool (word to guess)
            attempts : data[1], //int (number of attempts )
            spellcheck : data[2], //bool (whether or not to spellcheck)
            clipboard : clipboard,
            code : params.get("data") //str (base64 encoded game code. used for sharing)
        })

    }, [])

    function getAlert() {
        if (gameData.clipboard) {
            return "Game URL copied to clipboard";
        }
        return null;
    }
  
    if (gameData !== null && (gameData.spellcheck === false || wordlist !== null)) {
        return <Game 
            alert={getAlert()} //won't run immediately because of the condtional 
            word={gameData.word} 
            attempts={gameData.attempts} 
            wordlist={wordlist} 
            code={gameData.code}
        />
    }
}



export default GamePage;