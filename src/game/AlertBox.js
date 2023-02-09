function AlertBox(props) {
    return props.msg !== null && ( 
        <div className="alert-box max-alert-width">
			<img onClick={() => props.close()}className="x-icon"></img>
			<p>{props.msg}</p>
        </div>
    )
}


export default AlertBox;