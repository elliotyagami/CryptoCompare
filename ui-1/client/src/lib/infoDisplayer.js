/**
 * Helper functions for Displaying Currency Info Menus
 *
 * @requires displayer.js
 * @requires inputDisplayer.js
 * @requires advancedInputDisplayer.js
 * @requires tableDisplayer.js
 * @requires jsonRequester.js
 *
 * @author Harsh Jain
 */


/**
 * Append a Currency info menu onto an HTMLElement.
 * A Currency Info Menu contains 2 selector menus,
 * a from currency selector and a to currency selector.
 * The menu also contians an HTMLSpanElement containing currency data,
 * and an HTMLDivElement containing the menu log.
 *
 * @param {string} id
 *  The id of the element to append to
 */
function appendInfoMenu(id)
{
    // Create the container
    var container = getElement("div", "flexible col");

    // Create the menu container
    var columnMenu = getElement("div", "highlyFlexible flexDisplay");

    // Create the log
    var log = createLog();

    // Create the Currency Info Display Pane
    var infoPane = getInfoPane(log.logDisplay);

    // Onclick function for updating the From Symbol
    var updateFrom = function(){
        var selectorMenu = this.parentNode.parentNode.parentNode;
        var infoDisplay = selectorMenu.infoPane.display;

        selectAndUpdateSymbol(infoDisplay, "fromSym", this.innerHTML);

        toggleElement(selectorMenu, this);
    };

    // Onclick function for updating the To Symbol
    var updateTo = function(){
        var selectorMenu = this.parentNode.parentNode.parentNode;
        var infoDisplay = selectorMenu.infoPane.display;

        selectAndUpdateSymbol(infoDisplay, "toSym", this.innerHTML);

        toggleElement(selectorMenu, this);
    };

    // Create the from Selector Menu and append it
    var fromSelector = getTiedSelectorMenu("From", FROM_SYMS, updateFrom, infoPane);
    columnMenu.appendChild(fromSelector);

    // Create the to Selector Menu and append it
    var toSelector = getTiedSelectorMenu("To", TO_SYMS, updateTo, infoPane);
    columnMenu.appendChild(toSelector);

    // Append the info Display pane
    columnMenu.appendChild(infoPane);

    // Append the menu to the container
    container.appendChild(columnMenu);

    // Append the log to the container
    container.appendChild(log);

    const WELCOME_MESSAGE = ["Welcome to CryptoCompare!","-",
        "CryptoCompare is a Clientside WebApp for tracking Cryptocurrencies.",
        "Simply select a currency in the From menu, then select a currency in the To menu.",
        "The Conversion Data will appear on the table in the Currency Info section of the page.",
        "Click any row of the data table to print currency information to this log.",
        "Click the plus button on the converter to print conversions to this log.",
        "-", "Click Me to Delete!"];

    // Log the welcome message
    logText(log.logDisplay, getTextLines(WELCOME_MESSAGE));

    document.getElementById(id).appendChild(container);
}


/**
 * Create a tied Selector Menu.
 * A Tied Selector Menu stores a display,
 * thus allowing for onclick functions which modify sepcific HTML Displays.
 *
 * @param {string} title
 *  The title of the Selctor Menu
 * @param {Array} items
 *  An Array of strings storing the default values for the menu
 * @param {Function} selectFunc
 *  The onclick function of each item
 * @param {HTMLElement} display
 *  An HTMLELement
 *
 * @returns {HTMLSpanlement}
 *  The menu
 */
function getTiedSelectorMenu(title, items, selectFunc, display)
{
    // Create the menu
    var menu = getSelectorMenu(title, items, selectFunc);

    // Set its display
    menu.selectorMenu.infoPane = display;

    // Return it
    return menu;
}


/**
 * Update a display and retrieve its currency data.
 * The display requires a to and from symbol to request the data.
 * When the data is loaded, it is displayed.
 *
 * @param {HTMLElement} display
 *  The display
 *  display requires fromSym and toSym attributes
 * @param {string} displayKey
 *  The key of the specific attribute of the display to edit
 *  This attribute or childNode is edited before data is requested
 *  intended value either "fromSym" or "toSym"
 * @param {string} value
 *  The new value to display in display[displayKey]
 */
function selectAndUpdateSymbol(display, displayKey, value)
{
    // Set the value of the display
    display[displayKey].innerHTML = value;

    // Request the data
    requestCurrencyData(display.fromSym.innerHTML, display.toSym.innerHTML, function(data){
        displayData(data, display);
        updateConverter(data, display);
    });
}


/**
 * Create a Currency Info Pane.
 * A Currency Info Pane can be used to display currency
 * conversion data in table format.
 * The pane is returned as a flexible HTMLSpanELement.
 *
 * @param {HTMLElement} logDisplay
 *  The log for the pane to be tied to
 *
 * @returns {HTMLSpanElement}
 *  The Pane
 */
function getInfoPane(logDisplay)
{
    // Create the container
    var container = getElement("span", "highlyFlexible col");

    const INFO_BAR_TEXT_SIZE = 15;

    // Create the title bar
    var titleBar = getInputBar("Currency Info", INFO_BAR_TEXT_SIZE);

    // Create the currency data display pane
    var infoDiv = getElement("div", "flexible paddedContainer");

    // Append a symbol bar
    appendSymbolLabelBar(infoDiv);

    // Create the table display
    var dataTable = getTableDataDisplay(TABLE_FORMATS, function(){
        logRow(logDisplay, infoDiv, this);
    });

    // Store the table
    infoDiv.tableDisplay = dataTable;

    // Append it to the display pane
    infoDiv.appendChild(dataTable);

    // Create the converter display
    var converter = getConversionMenu(function(){
        var converter = this.parentNode.parentNode;

        var conversion = converter.fromSym.innerHTML + " " + converter.fromInput.value + " = " +
            converter.toSym.innerHTML + " " + converter.toInput.value;

        logConversionHTML(logDisplay, infoDiv, conversion);
    });

    // Store the converter
    infoDiv.converter = converter;

    // Append the converter to the pane
    infoDiv.appendChild(converter);

    // Set the container's display attribute
    container.display = infoDiv;

    // Load the Default Data
    requestCurrencyData(infoDiv.fromSym.innerHTML, infoDiv.toSym.innerHTML, function(data){
        displayData(data, infoDiv);
        updateConverter(data, infoDiv);
    });

    // Append both the bar and display
    container.appendChild(titleBar);
    container.appendChild(infoDiv);

    // Return the container
    return container;
}


/**
 * Create a log element and return it.
 * A log is simply an HTMLDivElement with a title bar and clear button.
 * The clear button will reset the HTML of the log.
 *
 * @returns {HTMLDivElement}
 *  The log
 */
function createLog()
{
    const LOG_TEXT_SIZE = 15;

    // Create the container
    var logContainer = getElement("div", "flexible col darker");

    // Create the title bar
    var titleBar = getInputBar("Log", LOG_TEXT_SIZE);

    // Add the clear button to the title bar
    appendContents(titleBar, {
        "Clear" : function() {
            this.parentNode.parentNode.logDisplay.innerHTML = "";
        }
    });

    // Append the title bar to the log container
    logContainer.appendChild(titleBar);

    // Create the actual log
    var log = getElement("div", "flexible");

    // Append the log to the container
    logContainer.appendChild(log);

    // Tie the log to its container
    logContainer.logDisplay = log;

    // Return the container
    return logContainer;
}


/**
 * Log a row from a table.
 * This function will take the elements from an HTML table row
 * and append them onto a log.
 *
 * @param {HTMLDivElement} logDisplay
 *  The log
 * @param {HTMLDivElement} infoDiv
 *  The conversion information div from which the row comes from
 * @param {HTMLTableRowElement} row
 *  The row element
 */
function logRow(logDisplay, infoDiv, row)
{
    // Get the log entry
    var logRow = getConversionLogEntry(infoDiv, "toggled");

    // Loop over each value in the row
    for(cell of row.childNodes)
    {
        let logCell = document.createElement("span");
        logCell.innerHTML = cell.innerHTML;

        // Append each cell onto the row display span
        logRow.infoEntry.appendChild(logCell);
    }

    // Append the row to the log
    logDisplay.appendChild(logRow);
}

/**
 * Log Conversion HTML onto a log display.
 * Conversion HTML can be any HTML relating to the to and from symbols of the given
 * currency information pane.
 *
 * @param {HTMLDivElement} logDisplay
 *  The log
 * @param {HTMLDivElement} infoDiv
 *  The conversion information div from which the row comes from
 * @param {string} html
 *  the HTML to be displayed
 */
function logConversionHTML(logDisplay, infoDiv, html)
{
    // Get the log entry
    var logRow = getConversionLogEntry(infoDiv, "toggled2");

    // Create the container Span
    var containerSpan = getElement("span", "flexible");

    // Append the given HTML
    containerSpan.innerHTML = html;

    // Append it to the row's info entry
    logRow.infoEntry.appendChild(containerSpan);

    // Append the entry
    logDisplay.appendChild(logRow);
}


/**
 * Create and return a default instance of a Log Entry.
 * Log Entries can be deleted on click,
 * and contain a title span denoting the to and from currency symbols.
 *
 * @param {HTMLDivElement} infoDiv
 *  The currency information division the log entry is coming from.
 *  infoDiv only needs toSym and fromSym childNodes.
 * @param {string} className
 *  The class name of the title label
 */
function getConversionLogEntry(infoDiv, className)
{
    // Create the log row
    var logRow = getElement("div", "darker logEntry");

    // Get the conversion symbols
    var fromSym = infoDiv.fromSym.innerHTML;
    var toSym = infoDiv.toSym.innerHTML;

    // Create the conversion cell
    var conversionSpan = getElement("span", className);
    conversionSpan.innerHTML = fromSym + " -> " + toSym;

    logRow.appendChild(conversionSpan);

    // Create the row display span
    var infoEntry = getElement("span", "clickable dominant logEntry");

    // Set delete function
    infoEntry.onclick = function(){
        var display = this.parentNode.parentNode;
        display.removeChild(this.parentNode);
    };

    // Append the information span
    logRow.appendChild(infoEntry);

    // Store it as well
    logRow.infoEntry = infoEntry;

    // Return the row
    return logRow;
}


/**
 * Log text onto a log
 * Text is not meant to be HTML code,
 * but the function will not throw an error if HTML code is passed in as text
 *
 * @param {HTMLDivElement} logDisplay
 *  Any HTML container, intended to be a div element
 * @param {string} text
 *  The text to append to the container
 */
function logText(logDisplay, text)
{
     // Create the log row
     var logRow = getElement("div", "darker logEntry");

     // Create the label
     var textLabel = getElement("span", "clickable");

     // Add the text to the label
     textLabel.innerHTML = text;

     // Set the label's delete function
     textLabel.onclick = function(){
         logDisplay.removeChild(this.parentNode);
     };

     // Append the label
     logRow.appendChild(textLabel);

     // Append the row
     logDisplay.appendChild(logRow);
}


/**
 * Append a Currency Conversion Symbol bar to an HTMLELement
 * This bar displays a to and from Symbol in an HTMLDivElement container
 *
 * @param {HTMLElement} infoDiv
 *  The HTMLElement to append to
 */
function appendSymbolLabelBar(infoDiv)
{
    // Create the bar flex container
    var labelSpanBar = getElement("div", "infoDisplayFlex");

    // Create the from symbol span
    var fromSymbol = getElement("span", "symbol");
    fromSymbol.innerHTML = DEFAULT_FROM_SYM;

    // Create the equals sign span
    var equalSpan = getElement("span", "nonSymbol");
    equalSpan.innerHTML = "to";

    // Create the to symbol span
    var toSymbol = getElement("span", "symbol");
    toSymbol.innerHTML = DEFAULT_TO_SYM;

    // Append all the span elements
    labelSpanBar.appendChild(fromSymbol);
    labelSpanBar.appendChild(equalSpan);
    labelSpanBar.appendChild(toSymbol);

    // Set the given container's to and from Symbol attributes
    infoDiv.fromSym = fromSymbol;
    infoDiv.toSym = toSymbol;

    // Append the span bar to the container
    infoDiv.appendChild(labelSpanBar);
}


/**
 * Update a Currency Information Pane's Converter Menu.
 *
 * @param {Object} data
 *  Currency Data
 * @param {HTMLDivElement} infoDiv
 *  A Currency Information Pane
 */
function updateConverter(data, infoDiv)
{
    // Get the converter
    var converter = infoDiv.converter;

    // Get the to and from symbols
    var fromSym = infoDiv.fromSym.innerHTML;
    var toSym = infoDiv.toSym.innerHTML;

    // Reset the converter's labels
    converter.fromSym.innerHTML = fromSym;
    converter.toSym.innerHTML = toSym;

    // Set default from rate
    var fromRate = 0.0;

    // If there is no error retrieving the data
    if(!data.Response)
        // Get the actual from rate
        fromRate = data.RAW[fromSym][toSym].PRICE;

    // Reset the converters rates
    converter.fromInput.rate = fromRate;
    converter.toInput.rate = 1.0 / fromRate;

    // Re calculate the values
    converter.toInput.value = Number.parseFloat(converter.fromInput.value) * converter.fromInput.rate;
}
