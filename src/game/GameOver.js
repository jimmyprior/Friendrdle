function GameOver(props) {
    /* props: 
        shareURL : str  (sms share link)
        won : bool (win status)
        word : str  (the correct word )
        attempts : int (number of attempts used)
    */

    function getMessage() {
        let msg = ""
        if (props.won) {
            msg = `You won in ${props.attempts} attempt`;
            if (props.attempts > 1) {
                msg += "s";
            }
        } 
        else {
            msg = `You lost. The word was ${props.word}`;
        }
        return msg;
    }
    return (
        <div className="center-top-absolute">
            <p>{getMessage()}<a href={props.shareURL}>Share</a></p>
        </div>
    )
}


export default GameOver;