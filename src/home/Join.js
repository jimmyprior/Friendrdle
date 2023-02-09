import { useState} from 'react';

import {decodeGameData} from "../utils"

function Join(props) {
    /*
    props: 
    joinGame(gameData)
    */

    const [ID, setID] = useState("")

    return (
    <div className="input-card"> 
        <h2>Join</h2>
        <p>Join a friend's game using its game id</p>
        <div>
        <label>Game ID</label>
        <input value={ID} onChange={(event) => {
            //make sure the chracter is valid
            setID(event.target.value);

            }} type="text"></input>
        </div>
        <div className="center-content">
        <button onClick={() => {
            const endpoint = `/play?data=${ID}`;

            const decoded = decodeGameData(ID);

            if (!decoded) {
                console.log("invalid game data");
            }
            else {
                props.setLocation(endpoint);
            }
            }}>Join</button>
        </div>
    </div>
    )
}


export default Join;
