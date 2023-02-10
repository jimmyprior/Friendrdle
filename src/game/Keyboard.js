
const layout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["DEL", "Z", "X", "C", "V", "B", "N", "M", "ENT"]
];

const aliases = {
    "DEL" : "Backspace",
    "ENT" : "Enter"
}

function KeyBoard(props) {
  /*
  props: 
      onKeyPress({key : "A"}) key press callback
      keyColors : {key : color}  (tells it what colors the keys should be)
  */

  return(
    <div className="center-col max-keyboard-width">
      {
        layout.map((row, rowIndex) => {
          return <div key={rowIndex} className="center-row">{
            row.map((alias, colIndex) => {
              //these display different from value so fix to represent real value
              let keyValue = alias;

              //default style
              let style = {
                  width : "10%",
                  backgroundColor : "lightgrey"
              };

              if (alias in aliases) {
                  keyValue = aliases[alias];
                  style.width = "13%";
              }

              if (keyValue in props.keyColors) {
                  style.backgroundColor = props.keyColors[keyValue];
              }

              return (
                  <div 
                      onClick={() => {props.onKeyPress({key : keyValue})}} 
                      style={style} 
                      key={alias} 
                      className="keyboard-key prevent-select"><p>{alias}</p>
                  </div>
              )
          })}</div>
        })
      }
    </div>
  )
}


export default KeyBoard