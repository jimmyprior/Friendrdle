
const CellState = {
  EMPTY : 0, //grey
  RIGHT : 1, //green
  CLOSE : 2, //yellow
  WRONG : 3 //red
}

const CellColor = {
  0 : "#C0C0C0",
  1 : "#6BAB64",
  2 : "#CAB45A",
  3 : "#C44040"
}


function Cell(props) {
    //color letter for props 
    const SQUARE_GAP = 3
    const SQUARE_B_WEIGHT = 5
    const BORDER_COLOR = "#808080"
  
    return (
      <svg width="100%" viewBox="0 0 100 100">
        <rect 
          x="0"
          y="0"
          fill={BORDER_COLOR} 
          width="100%"
          height="100%"
        />
        <rect 
          x={SQUARE_GAP + SQUARE_B_WEIGHT} 
          y={SQUARE_GAP + SQUARE_B_WEIGHT}
          fill={CellColor[props.state]} 
          width={100 - (SQUARE_GAP + SQUARE_B_WEIGHT)  * 2} 
          height={100 - (SQUARE_GAP + SQUARE_B_WEIGHT)  * 2}
        />
        <text 
          x="50%" 
          y ="60%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill="black" 
          fontSize={100 - (SQUARE_GAP + SQUARE_B_WEIGHT)  * 2}>
            {props.character}
        </text>
      </svg>
    )
  }
  
  

function getEmptyBoard(word, attempts) {
    //create empty board 
    const board = [];
    for (let i = 0; i < parseInt(attempts); i++) {
      const row = [];
  
      for (let l of word) {
        row.push({
          state : CellState.EMPTY,
          character : ""
        });
      }
      board.push(row);
    }
    return board;
}



function Board(props) {
    /*
    props: 
        board (contains information about the board)
            [cell, cell]
        cell : {
            state : 
            character : 
        }
    */
    return (
      <div className="center-col div-no-extra max-board-width">
        {props.board.map((row, rowIndex) => (
          <div className="center-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <div className="board-cell" style={{"width" : "" + 100 / props.board[0].length + "%"}} key={cellIndex}>
                    <Cell state={cell.state} character={cell.character}></Cell>
                </div>
            ))}
        </div>
    ))}
    </div>
)}


  
export {Board, getEmptyBoard, CellState, CellColor};