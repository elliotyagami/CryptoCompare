/**
 * Helper functions for retrieving JSON Files
 * 
 * @author Harsh Jain
 */

const FROM_PREFIX = "fsyms";
const TO_PREFIX = "tsyms";

const COIN_DATA_URL = "https://min-api.cryptocompare.com/data/pricemultifull";

// Default from Symbols
let unsortedFrom = ["BTC", "ETC", "XRP", "DOGE", "STR", "BCH", "MAID", "DASH","BCN", "XEM"];
unsortedFrom.sort();

const FROM_SYMS = unsortedFrom;
const DEFAULT_FROM_SYM = "BTC";

// Default to Symbols
unsortedTo = ["USDT", "BTC", "ETH"];
unsortedTo.sort();

const TO_SYMS = unsortedTo;
const DEFAULT_TO_SYM = "USDT";


 /**
 * Request, Parse, and Interpret JSON data from a server.
 * 
 * @param {string} url 
 *  Url of JSON file
 * @param {Function} onload
 *  function to call when data is recieved 
 */
function requestData(url, onload)
{
    var currentRequest = new XMLHttpRequest();

    // Define Request
    currentRequest.open("GET",url);

    // Set Callback for when data is loaded
    currentRequest.onload = function(){
        let data = JSON.parse(currentRequest.responseText);
        onload(data);
    };

    // Send Request
    currentRequest.send();
}


/**
 * Request and interperet Currency Data specifically.
 * 
 * @param {string} fromSym 
 *  The from currency code
 * @param {string} toSym 
 *  The to currency code
 * @param {Function} onload 
 *  The function to be called on load
 */
function requestCurrencyData(fromSym, toSym, onload)
{
    // Create the request
    var request = COIN_DATA_URL + "?" + FROM_PREFIX + "=" + fromSym + "&" + TO_PREFIX + "=" + toSym;

    // Send the request
    requestData(request, onload);
}