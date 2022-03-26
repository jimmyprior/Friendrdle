import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";

function CreateScreen(props) {

    function onFinish(gameID) {
        useNavigate("https://api.friendrdle.com/game/" + gameID)
    }

    return (
        <div>
            <InputBox onFinish={onFinish}/>
        </div>
    )
}


class InputBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {word:""}
    }

    onLetter(letter) {
        this.setState({word:this.state.})
    }

    onBackspace() {
        let current = this.state.word;
        this.setState({word:current.substring(0, current.length)})
    }

    onEnter() {
        //check requiremnts. 
        //fetch and all that
        //let resp = fetch("https://api.friendrdle.com")
        this.props.onFinish(gameID);
        //pass the game id to the onFinish
    }

    render() {
        return (
            <div>
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