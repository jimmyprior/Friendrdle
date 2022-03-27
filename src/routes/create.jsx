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


export {CreatePage}