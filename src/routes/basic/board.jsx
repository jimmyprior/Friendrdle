import {useState} from "react"
import useDimensions from "react-cool-dimensions";
//https://github.com/wellyshen/react-cool-dimensions


function Tile(props) {
    //15px, 15px with 10 font size is good 
    const [fontSize, setFontSize] = useState(0)

    const { observe, unobserve, width, height, entry } = useDimensions({
        onResize: ({ observe, unobserve, width, height, entry }) => {
            setFontSize(Math.round(2 / 3 * width))
        },
      });

    return (
      <div ref={observe} className="Tile" style={{fontSize: "" + fontSize + "px", backgroundColor:props.color}}>{props.letter}</div>
    )
}

function Board(props) {
    
    return (
        <div className="Board">
            {props.board.map((row, y) => (
            <div key={y} className="BoardRow">
                {row.map((pair, x) => (
                    //pair is [letter, color]
                    <Tile key={x} color={pair[1]} letter={pair[0]}></Tile>
                ))}
            </div>
            ))}
        </div>
    )
}


export {Tile, Board}

