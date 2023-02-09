import {useLocation} from "wouter";

import CONFIG from "../config"

import Create from "./Create";
import Join from "./Join"
import Random from "./Random";

function HomePage() {

    const [location, setLocation] = useLocation();


    function setError(msg) {
        console.log(msg)
    }

    async function copyToClipboard(endpoint) {
    /*
    copies the text from the textbox to the clipboard when the button is pressed. 
    */
        await navigator.clipboard.writeText(CONFIG.PUBLIC_URL + endpoint); 
        console.log("link copied to clipboard")
    } 
    
    return (
    <div className="center-col space-evenly">
        <Create setLocation={setLocation} copyToClipboard={copyToClipboard}></Create>
        <Join setLocation={setLocation} copyToClipboard={copyToClipboard}></Join>
        <Random setLocation={setLocation} copyToClipboard={copyToClipboard}></Random>
    </div>
    )
}


export default HomePage;


  

