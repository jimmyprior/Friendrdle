import {useEffect} from 'react';


function Key(props) {

    function clicked() {
      props.onclick(props.letter)
    } 
  
    return (
      <div style={{backgroundColor:props.color}} className="Key" onClick={clicked}>{props.letter}</div>
    )
  }

function KeyBoard(props) {
    //props cotain red:[], yellow:[], green:[]
    //onBackspace, onEnter, onChar

    function getColor(key) {
        return props.colors.hasOwnProperty(key) ? props.colors[key] : null;
      //looks up color in the props and returns it. color is passed as a prop to the key this
    }
  
    useEffect(() => {
      //https://www.30secondsofcode.org/react/s/use-key-press
      function click(e) {
        clicked(e.key)
      }
  
      window.addEventListener('keydown', click);
  
      return () => {
        window.removeEventListener('keydown', click);
      };    
  
    }, []);
  
  
    function clicked(key) {
      //handle regular keyboard
      let upper = key.toUpperCase()
      if ("QWERTYUIOPASDFGHJKLZXCVBNM".includes(upper)) {
        props.onLetter(upper)
      }
      else if (upper === "BACKSPACE" || upper === "DEL") {
        props.onBackspace()
      }
      else if (upper === "ENT" || upper === "ENTER") {
        props.onEnter()
      }
    }
    
    const layout = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["DEL","Z","X","C","V","B","N","M","ENT"]
    ]

    return (
        <div>
            {layout.map((letters, y) => (
                <div key={y} className="KeyBoardRow">
                    {letters.map((l, x) => (
                        <Key key={l} color={getColor(l)} onclick={clicked} letter={l}/>
                    ))}
                </div>
            ))}
        </div>
    )
  }


export {KeyBoard}