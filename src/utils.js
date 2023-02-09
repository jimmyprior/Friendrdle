import { Buffer } from "buffer";
import CONFIG from "./config"

//python like range iterator for generating the dropdown
const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));


function encodeGameData(word, attempts, dictionary) {
    /*
    word : String (word to be guesses)
    attempts : Number (number of guesses or attemtps person will have)
    dictionary : Boolean (whether or not to force them to use a dictionary)
    clipboard : was the link just copied to clipboard?
    -> base64 encoded data
    */
    return Buffer.from(`${word}|${attempts}|${Number(dictionary)}`).toString("base64")
}
  
  
function decodeGameData(base64_string) {
    /*
    data : base64 encoded data
    [String : word, integer : attempts, boolean : force dictionary?]
    */
    const data = Buffer.from(base64_string, "base64").toString("utf-8").split("|");  
    if (data.length === 3) {
        return [data[0], data[1], (data[2] / 1 == 1)]
    }
}


function getQueryParams() {
    /*
    hello
    */
    return new URLSearchParams(window.location.search)
}


async function fetchWordlist() {
    const resp = await fetch(CONFIG.PUBLIC_URL + "/wordlist.txt");
    const words = (await resp.text()).split("\n")
    const wordlist = new Set(words.map((word) => word.toUpperCase()))
    return wordlist;
}


export {encodeGameData, decodeGameData, range, getQueryParams, fetchWordlist}