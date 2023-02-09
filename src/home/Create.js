import { useState} from 'react';

import {range, encodeGameData } from "../utils"
import CONFIG from "../config"


const DEFAULT_GUESS_NUM = 5


function checkValidChars(text) {
  for (let char of text) {
    if (!CONFIG.CHARACTER_SET.has(char)) {
      console.log(char + " is not a valid chracter");
      //if not a valid chracter dont change the input and raise an error
      return false;
    }
  }
  return true;
}


function Create(props) {
  /*
  props: 
  copyToClipboard(endpoint)
  setLocation(endpoint)
  */
  const [data, setData] = useState({
    word : "", 
    guesses : DEFAULT_GUESS_NUM, 
    dictionary : false
  })

  return (
    <div className="input-card">
      <h2>Create</h2>
      <p>Create a new game to share with your friends</p>
      <div>
        <label>Word</label>
        <input value={data.word} onChange={(event) => {
            //make sure the chracter is valid
            let text = event.target.value.toUpperCase();

            if (checkValidChars(text)) {
              setData({...data, word : text})
            }

          }} type="text"></input>
      </div>
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
          if (data.word.length < CONFIG.MIN_WORD_LEN) {
            console.log("word length must be greater than " + CONFIG.MIN_WORD_LEN);
            return;
          } 
          
          props.copyToClipboard(`/play?data=${
            encodeGameData(
              data.word, 
              data.guesses, 
              data.dictionary
            )}`);

          props.setLocation(`/play?data=${
            encodeGameData(
              data.word, 
              data.guesses, 
              data.dictionary
            )}&clipboard=true`);

        }}>Create</button>
      </div>
    </div>
  )
}



export default Create;