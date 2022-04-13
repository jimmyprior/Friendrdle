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

    function copyLink() {
        navigator.clipboard.writeText(link)
    }

    return (
        <div>
            <div className="title">
                <img className="title-img"></img>
                <h1 className="title-text">Friendrdle</h1>
                <img className="title-img"></img>
            </div>
            {link !== null && (
                <div>
                    <p>Your game has been created</p>
                    <p>Copy Shareable Link:</p>
                    <button onClick={copyLink}>Copy</button>
                    <p>Try it out:</p>
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


            </div>
        )
    }


}

class Create extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            word:"", 
        }
        this.guesses = 4
        this.dictionary = false

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
        this.props.onFinish({
            word : this.state.word,
            guesses : this.guesses,
            dictionary : this.dictionary
        })
        //this.props.onFinish(gameID);
        //pass the game id to the onFinish
    }

    handleGuessChange(e) {
        this.guesses = e.target.value;
    };

    render() {
        return (
            <div>
                <div>
                    <div className="BoardRow">
                        <Tile letter="C"/>
                        <Tile letter="R"/>
                        <Tile letter="E"/>
                        <Tile letter="A"/>
                        <Tile letter="T"/>
                        <Tile letter="E"/>
                    </div>
                </div>
                <div className="form-field">
                    <label>
                        Word:
                        {this.state.word.length > 0 && 
                            <div className="BoardRow">
                                {this.state.word.split("").map((char, index) => (
                                    <Tile key={index} letter={char} color={null} />
                                ))}
                            </div>
                        }
                        {this.state.word.length == 0 &&
                            <div className="BoardRow">
                                <Tile></Tile>
                            </div>
                        }
                    </label>
                </div>
                <div className="form-field">
                    <label className="inline-label">
                            Guesses:
                            <select id="create-dropdown" onChange={this.handleGuessChange.bind(this)}>
                                {
                                    GUESSES.map((val, i) => (
                                        <option key={i} value={val}>{val}</option>
                                    ))
                                }
                            </select>
                    </label>
                    <label className="inline-label">
                        Force Dictionary:
                        <input type="checkbox" onChange={() => this.dictionary = !this.dictionary}/>                    
                    </label>     
                </div>
                <div className="form-field"/>
                <KeyBoard colors={{}} onEnter={this.onEnter.bind(this)} onBackspace={this.onBackspace.bind(this)} onLetter={this.onLetter.bind(this)}/>
            </div>
        ) 
    }
}


//https://www.flaticon.com/free-icon/information_545674
//https://www.flaticon.com/free-icon/information_906794

export {CreatePage, CreateTest}