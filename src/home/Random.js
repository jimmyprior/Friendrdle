import {useState} from 'react';

import CONFIG from "../config"
import {range, encodeGameData} from "../utils"

const DEFAULT_GUESS_NUM = 5

function Random(props) {
    /*
    props: 
    joinGame(gameData)
    */
    const [data, setData] = useState({
        guesses : DEFAULT_GUESS_NUM,
        dictionary : false
    })


    async function onSubmit() {
      const resp = await fetch(CONFIG.PUBLIC_URL + "/dictionary.txt");
      const words = (await resp.text()).split("\n")
      const wordlist = words.map((word) => word.toUpperCase())
      const word = wordlist[Math.floor(Math.random() * wordlist.length)]
      const endpoint = `/play?data=${
        encodeGameData(
          word, 
          data.guesses, 
          data.dictionary
        )}`
      
      props.setLocation(endpoint);
    }
  
    return (
      <div className="input-card"> 
        <h2>Random</h2>
        <p>Play a game with a random word</p>
        <div>
          <label>Spell check</label>
          <input checked={data.dictionary} onChange={() => setData({...data, dictionary : !data.dictionary})} type="checkbox"></input>
        </div>
        <div>
          <label>Guesses</label>
          <select defaultValue={CONFIG.DEFAULT_GUESS_NUM} onChange={(event) => {setData({...data, guesses : event.target.value})}}>
            {
                range(CONFIG.MIN_GUESSES, CONFIG.MAX_GUESSES).map((number) => {
                    return <option key={number} value={number}>{number}</option>
              })
            }
          </select>
        </div>
        <div className="center-content">
          <button onClick={() => {
            onSubmit();
          }}>Play</button>
        </div>
      </div>
    )
}


export default Random;