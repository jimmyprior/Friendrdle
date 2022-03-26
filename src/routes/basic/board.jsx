

function Tile(props) {
    return (
      <div className="Tile" style={{backgroundColor:props.color}}>{props.letter}</div>
    )
}
  


function Board(props) {
    return (
        <div>
            {props.error !== null && (
                <div className="BoardError">
                    {props.error !== null && <p>{props.error}</p>}
                </div>
                )
            }

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

