import React, {useState, useEffect} from 'react';


class Message extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          msg: "",
        };
        this.timerId = null;
    }
      
    resetMessage(msg) {
        this.setState({msg: msg})
        this.timerId = setTimeout(() => {
          this.setState({ msg: "" });
           this.timerId = null;
        }, 5000);
    }
    
    componentDidUpdate(newProps) {
        //console.log(newProps)
        if (newProps.msg !== this.state.msg && this.msg != "") {
            this.resetMessage(newProps.msg)
        }
    }
      
    componentWillUnmount() {
        clearTimeout(this.timerId);
    }


    render() {
        if (!(this.state.msg > 0)) {
            return null;
        }
        return (
            <div className="error">
                <p>{this.state.msg}</p>
            </div>
        )
    }
}

export default Message;