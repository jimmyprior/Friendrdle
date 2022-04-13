import React, {useState, useEffect} from 'react'
import {KeyBoard} from "./basic/keyboard"
import {Tile} from "./basic/board"


function CreatePage(props) {

    const [link, setLink] = useState(null)
    function onFinish(data) {
        //useNavigate("https://api.friendrdle.com/game/" + gameID)
        fetch("https://api.friendrdle.com/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => setLink(window.location.href + "game/" + json.gameID))
    }

    useEffect(() => {
        navigator.clipboard.writeText(link)
      }, [link]); // Only re-run the effect if count changes


    return (
        <div>
            {link !== null && (
                <div>
                    <p>Link Copied to clipboard. Share this link with your friends!</p>
                    <a href={link}>Link To Game</a>
                </div>
            )}
            {link === null && (
                <Create onFinish={onFinish}/>
            )}
        </div>
    )
}


const VALID_CHARS = "qwertyuiopasdfghjklzxcvbnm";
const MIN_GUESSES = 4;
const MAX_GUESSES = 20;
const GUESSES = [];

for (let i = MIN_GUESSES; i < MAX_GUESSES; i++) {
    GUESSES.push(i);
}



class CreateTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {word:"", guesses:6, wordlist:""}
    }

    handleWordInput() {

    }

    handleSubmit(event) {
        //data validation???
        let data = {
            "word" : "default",
            "guesses" : 0,
            "wordlist" : []
        }
        //fetch("https://api.friendrdle.com/create")
    }

    render() {
        //https://www.carlrippon.com/suppressing-characters-in-react-input/
        // <img width="40px" src=""></img>
        // <h1>Friendrdle</h1>
        // <img width="40px" src=""></img>
        return (
            <div>
                <div className="title">
                    <img className="title-img"></img>
                    <h1 className="title-text">Friendrdle</h1>
                    <img className="title-img"></img>
                </div>
                <div className="error">
                    <p>Error msg goes here!</p>
                </div>
                <form id="create">
                    <label className="full-label">
                        Word
                        <input id="word-input" type="text"/>
                    </label>
                    <label className="inline-label">
                        Guesses:
                        <select id="create-dropdown">
                            {
                                GUESSES.map((val, i) => (
                                    <option key={i} value={val}>{val}</option>
                                ))
                            }
                        </select>
                    </label>
                    <label className="full-label">
                        Word List Add-Ons
                        <input id="wordlist-input" type="text"/>
                    </label>
                    <input id="create-button" type="submit" value="Create" />
                </form>
            </div>
        )
    }


}

class Create extends React.Component {

    constructor(props) {
        super(props)
        this.state = {word:"", guesses:5}
    }

    onLetter(letter) {
        if (this.state.word.length < 20) {
            this.setState({word:this.state.word + letter})
        }
    }

    onBackspace() {
        if (this.state.word.length > 0) {
            let current = this.state.word;
            this.setState({word:current.substring(0, current.length-1)})
        }
    }

    onEnter() {
        //check requiremnts. 
        //fetch and all that
        //let resp = fetch("https://api.friendrdle.com")
        this.props.onFinish(this.state)
        //this.props.onFinish(gameID);
        //pass the game id to the onFinish
    }

    render() {
        return (
            <div>
                <p>Type a word</p>
                <div className="BoardRow">
                    {this.state.word.split("").map((char, index) => (
                        <Tile key={index} letter={char} color={null} />
                    ))}
                </div>
                <KeyBoard colors={{}} onEnter={this.onEnter.bind(this)} onBackspace={this.onBackspace.bind(this)} onLetter={this.onLetter.bind(this)}/>
            </div>
        ) 
    }

}


export {CreatePage, CreateTest}