/**
 * Helper functions for displaying tables
 *
 * @requires displayer.js
 *
 * @author Harsh Jain
 */

// Symbol to be used when there is insufficient data
const DEFAULT_SPACER = "-";

// Display colors
const POS_COLOR = "rgb(0,200,0)";
const NEG_COLOR = "rgb(255,60,60)";


 /**
  * A TableEntryFormat stores preferences for displaying attributes of an object.
  * Intended to be used for cells in HTMLTableElements.
  */
class TableEntryFormat
{
    /**
     * Constructor for TableEntryFormat.
     *
     * @param {string} displayName
     *  The display name for the attribute.
     * @param {boolean} comparable
     *  Whether the value of the attribute is a comparable number or not.
     * @param {boolean} percentage
     *  Whether the value of the attribute is a percentage or not
     */
    constructor(displayName, comparable, percentage)
    {
        this.displayName = displayName;
        this.comparable = comparable;
        this.percentage = percentage;
    }


    /**
     * Modify a string based on the format's preferences.
     *
     * @param {string} numberString
     *  The string to format
     *
     * @returns {HTMLElement}
     *  The bold text element containing the modified string
     */
    format(numberString)
    {
        // Create the bold text element
        var textElement = document.createElement("b");
        textElement.innerHTML = numberString;

        // Check if the text is a percentage
        if(this.percentage)
            textElement.innerHTML += " %";

        // If the text is comparable, set its color accordingly
        if(this.comparable)
            textElement.style.color = numberString.indexOf(" -") == -1 && !numberString.startsWith("-")
                ? POS_COLOR : NEG_COLOR;

        // Return the element
        return textElement;
    }
}

// Keys for accessing the price data mapped to their formats
const TABLE_FORMATS = {
    PRICE : new TableEntryFormat("Price", false, false),
    OPEN24HOUR : new TableEntryFormat("24hr Open Price", false, false),
    CHANGEPCT24HOUR : new TableEntryFormat(" 24hr % Change", true, true),
    CHANGE24HOUR : new TableEntryFormat("24hr Change", true, false),
    HIGH24HOUR : new TableEntryFormat("24hr High", false, false),
    LOW24HOUR : new TableEntryFormat("24hr Low", false, false),
    TOTALVOLUME24HTO : new TableEntryFormat("Total 24hr Volume", false, false)
};


/**
 * Create a blank Table Data Display.
 * This display is an HTMLTableElement with 2 columns,
 * attributes mapped to their values.
 * By default, all values are set to "TBD"
 *
 * @param {Object} keys
 *  An Object mapping attributes to their display formats
 * @param {Function} clickFunc
 *  The onclick event of each row in the table
 *
 * @returns {HTMLTableElement}
 *  The Table
 */
function getTableDataDisplay(keys, clickFunc)
{
    // create the HTMLTableElement
    var table = document.createElement("table");

    // Loop over all given keys
    for(let key in keys)
    {
        // Create the row
        let row = getElement("tr", "darker");

        // Set the click function
        if(clickFunc)
        {
            row.className += " clickable"
            row.onclick = clickFunc;
        }

        // Create the label column
        let label = document.createElement("th");
        label.innerHTML = keys[key].displayName;

        // Create the value column
        let value = document.createElement("th");
        value.className = "value";
        value.innerHTML = DEFAULT_SPACER;

        // Append both columns
        row.appendChild(label);
        row.appendChild(value);

        table[key] = value;

        // Append the row to the table
        table.appendChild(row);
    }

    // Return the table
    return table;
}


/**
 * Print currency data in a display's table display.
 * The display must have from and to symbol attributes.
 *
 * @param {Object} data
 *  Correctly formatted currency data
 * @param {HTMLElement} display
 *  An HTMLElement containing a tableDisplay attributes
 *  The tableDisplay must contain attributes listed im TABLE_FORMATS
 */
function displayData(data, display)
{
    // Get the from and to symbol keys
    var fromSym = display.fromSym.innerHTML;
    var toSym = display.toSym.innerHTML;

    // Loop over each desired attribute
    for(let key in TABLE_FORMATS)
    {
        // Clear the display
        display.tableDisplay[key].innerHTML = "";

        // Check if the data was retrieved correctly or not
        if(data.Response)
            // If not, use the default spacer
            display.tableDisplay[key].innerHTML = DEFAULT_SPACER;
        else
        {
            // If it is, Update the display
            let displayTextElement = TABLE_FORMATS[key].format(data.DISPLAY[fromSym][toSym][key]);
            display.tableDisplay[key].appendChild(displayTextElement);
        }
    }
}
