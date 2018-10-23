/**
 * Helper Functions for generating more complicated Input Displays
 *
 * @requires displayer.js
 * @requires inputDisplayer.js
 *
 * @author Harsh Jain
 */

 // The Colors of the utility buttons
 const ADD_COLOR = ""; // "rgb(60,40,10)";
 const DEL_COLOR = "rgb(43, 8, 8)";
 const LABEL_COLOR = ""; // "rgb(13,23,43)";


/**
 * Append The CryptoCompare Title Bar to an HTMLElement.
 *
 * @param {string} id
 *  The ID of the element to append to
 */
function appendTitleBar(id)
{
    // Get the container
    var container = document.getElementById(id);

    const TITLE_BAR_TEXT_SIZE = 18;

    // Create the display bar
    var bar = getInputBar("CryptoCompare", TITLE_BAR_TEXT_SIZE);

    const GIT_LINK = "https://github.com/harsh-98";

    var linkSpan = getElement("a", "clickable");
    linkSpan.innerHTML = "Git";
    // linkSpan.href = GIT_LINK;

    bar.appendChild(linkSpan);

    // Append the bar to the container
    container.appendChild(bar);
}


/**
 * Create and return a selector display.
 * A selector display is simply an HTMLSpanElement containing a menu bar
 * and a selection of multiple items.
 * The Menu bar is used for filtering items.
 * Each item is displayed as HTMLDivElements.
 *
 * @param {string} title
 *  The title of the menu
 * @param {Array} items
 *  An Array of strings,
 *  each representing a single selectable item
 * @param {Function} selectFunc
 *  The function to be called upon selection of an item
 *
 * @returns {HTMLSpanElement}
 *  The display
 */
function getSelectorMenu(title, items, selectFunc)
{
    // Create the parent container
    var container = getElement("span", "flexible col");

    // Create the selector menu
    var menu = getElement("div", "flexible paddedContainer darker");

    menu.displayItems = [];
    menu.flaggedItems = [];
    menu.selectorFunction = selectFunc;

    // Append each item to the selection
    for(let item of items)
    {
        let itemNode = getItemNode(item, selectFunc);
        menu.displayItems.push(itemNode);
        menu.appendChild(itemNode);
    }

    container.selectorMenu = menu;

    // Create the menu bar
    var menuBar = getSelectorMenuBar(title, menu);

    // Append the menu bar to the container
    container.appendChild(menuBar);

    // Append the selector menu to the container
    container.appendChild(menu);

    return container;
}


/**
 * Create an Item HTMLSpanElement.
 * An Item is an HTMLSpanElement displaying its name as well as 2 utility buttons.
 * These buttons deal with the filtering of the specific item.
 * Items are meant to be used as selections within a Selector Menu.
 *
 * @param {string} name
 *  The name of the item
 * @param {Function} selectFunc
 *  The function to be called upon selection of an item
 *
 * @returns {HTMLSpanElement}
 *  The Item Element
 */
function getItemNode(name, selectFunc)
{
    // Create the span
    var item = getElement("div", "item darker");
    item.name = name;
    item.flagged = false;

    // Create the item's contents
    var add = getSingleLabelSpan("+", 1, flag, ADD_COLOR);
    var label = getSingleLabelSpan(name, 2, selectFunc, LABEL_COLOR);
    var minus = getSingleLabelSpan("-", 1, removeItemNode, DEL_COLOR);

    // Append the to the item
    item.appendChild(add);
    item.appendChild(label);
    item.appendChild(minus);

    // return the item
    return item;
}


/**
 * Create A Selector Menu Bar.
 * The bar is simply an HTMLDivElement containing filter options.
 * Each option is in the form of a toggleable button.
 *
 * @param {string} title
 *  The title of the menu
 * @param {HTMLElement}
 *  The Selector menu
 *
 * @returns {HTMLDivElement}
 *  The Menu Bar
 */
function getSelectorMenuBar(title, selectorMenu)
{
    const CURRENCY_BAR_TEXT_SIZE = 15;
    const CURRENCY_BAR_INPUT_MAX = 5;

    // Create the bar
    var spanBar = getInputBar(title, CURRENCY_BAR_TEXT_SIZE);

    appendContents(spanBar,{
        "+" : function(){
                toggleElement(this.parentNode, this, "toggled2");
                displayNodes(selectorMenu, selectorMenu.flaggedItems);
            },
        "A" : function(){
                toggleElement(this.parentNode, this);
                displayNodes(selectorMenu, selectorMenu.displayItems);
            }
    });

    // Create the Text Input field
    var input = getInputTextField(CURRENCY_BAR_TEXT_SIZE, CURRENCY_BAR_INPUT_MAX);

    input.addEventListener("keydown", function(event){
        if(event.keyCode == 13)
            submitItemNode(input, selectorMenu);
    });

    // Append it to the bar
    spanBar.appendChild(input);

    // Append the add button to the bar
    appendContents(spanBar, {
        "Add" : function(){
            submitItemNode(this.parentNode.inputElement,
                this.parentNode.parentNode.selectorMenu);
        }
    });

    // Set the input container
    spanBar.inputElement = input;

    // Set default toggle
    toggleElement(spanBar, getElementByHTML(spanBar,"A"));

    // return the bar
    return spanBar
}


/**
 * Flag an Item Node.
 * An Item Node is intended to be a Child Node of a selector menu.
 *
 * This Function CANNOT be used alone,
 * intened use as an onclick event.
 */
function flag()
{
    // Get the item Node
    var itemNode = this.parentNode.parentNode;

    // Get the selector menu
    var selectorMenu = itemNode.parentNode;

    // Get the flagged items array
    var flaggedItems = selectorMenu.flaggedItems;

    // If the item is already flagged, unflag it
    if(itemNode.flagged)
    {
        flaggedItems.splice(flaggedItems.indexOf(itemNode),1);
        swapClasses(this, "toggled2", "");
    }
    // Otherwise, flag it
    else
    {
        let added = false;

        // Ensure the item is placed alphabetically
        for(let i = 0; i < flaggedItems.length; i++)
        {
            if(flaggedItems[i].name > itemNode.name)
            {
                flaggedItems.splice(i, 0, itemNode);
                added = true;
                break;
            }
        }

        if(!added)
            flaggedItems.push(itemNode);

        this.className += " toggled2";
    }

    // Toggle the item's flag
    itemNode.flagged = !itemNode.flagged;
}


/**
 * Remove an Item Node.
 * An Item Node is intended to be a Child Node of a selector menu.
 *
 * This Function CANNOT be used alone,
 * intened use as an onclick event.
 */
function removeItemNode()
{
    // Get the item node
    var itemNode = this.parentNode.parentNode;

    // Get the selector menu
    var selectorMenu = itemNode.parentNode;

    // Remove the item node
    selectorMenu.removeChild(itemNode);

    // Get the items arrays
    var flaggedItems = selectorMenu.flaggedItems;
    var displayItems = selectorMenu.displayItems;

    // Remove the node from flagged items
    if(flaggedItems.indexOf(itemNode) != -1)
        flaggedItems.splice(flaggedItems.indexOf(itemNode),1);

    // Remove the item form display nodes
    displayItems.splice(displayItems.indexOf(itemNode),1);
}


/**
 * Append an Item Node onto a selector menu.
 * This Function can be used alone.
 * Clears a text field and add its value to the selector menu.
 * The selector menu displays its items in alphabetical order.
 * This function will insert the created node into its alphabetically correct index.
 *
 * @param {HTMLInputElement} input
 *  The text input field
 * @param {HTMLElement} selectorMenu
 *  The Selector Menu
 */
function submitItemNode(input, selectorMenu)
{
     // Get the value of the field
    var name = input.value.toUpperCase();

    // Input text must be between 3 and 4 characters long
    if(name.length < 2)
        return;

    // Input Text must only be letters
    for(let char of name)
        if(char < 'A' || char > 'Z')
            return;

    // Clear the field
    input.value = "";

    // Create a new item Node
    var itemNode = getItemNode(name, selectorMenu.selectorFunction);

    var added = false;
    var displayed = false;

    // Loop over all the display items
    for(let i = 0; i < selectorMenu.displayItems.length; i++)
    {
        // If the index is valid for the child nodes of the menu,
        // and the item has yet to be displayed
        if(i < selectorMenu.childNodes.length && !displayed)
            if(selectorMenu.childNodes[i].name > itemNode.name)
            {
                // If childNodes[i] is alphabetically after itemNode,
                // Insert the itemNode into the menu
                selectorMenu.insertBefore(itemNode,selectorMenu.childNodes[i]);
                displayed = true;
            }

        if(selectorMenu.displayItems[i].name > itemNode.name)
        {
            // Insert the item into the displayItems array
            selectorMenu.displayItems.splice(i, 0, itemNode);
            added = true;

            break;
        }
    }

    // If the node was not displayed
    if(!displayed)
    {
        // Display it at the end of the menu
        selectorMenu.appendChild(itemNode);

        // If it was not added to the items array, push it onto the back of the array
        if(!added)
            selectorMenu.displayItems.push(itemNode);
    }
}


/**
 * Create and return an Instance of a Conversion Menu.
 * A Conversion Menu is an HTMLDivElement containing a title bar and two text input fields.
 * Each field will have a conversion rate (default of 1.0)
 * for converting its number value to the value of the other text field.
 * Conversions can also be logged, providided a logging function.
 *
 * @param {Function} logFunc
 *  The function to be called when the Conversion Menu's add button is clicked.
 *  If no logFunc is given, no add button will be added to the menu.
 *
 * @returns {HTMLDivElement}
 *  The Conversion Menu
 */
function getConversionMenu(logFunc)
{
    // Font size and max length of converter input fields
    const FONT_SIZE = 16;
    const MAX_LEN = 25;

    // Create the container
    var container = getElement("div", "darker col paddedContainer");

    // Create the title bar
    var titleBar = getInputBar("Converter", FONT_SIZE, "flexible toggled2");

    // If a logging function is given
    if(logFunc)
    {
        // Add a logging button to the converter menu
        appendContents(titleBar, {
            "+" : logFunc
        });
    }

    // Append the title bar
    container.appendChild(titleBar);

    // Create the from and to containers
    var fromCont = getInputBar("from", FONT_SIZE);
    var toCont = getInputBar("to", FONT_SIZE);

    // Create the text fields, set their defaults
    var fromInput = getInputTextField(FONT_SIZE, MAX_LEN, "extremelyFlexible clickable");
    fromInput.value = "1";
    var toInput = getInputTextField(FONT_SIZE, MAX_LEN, "extremelyFlexible clickable");

    // Tie the from and too input fields to each other
    tieConversionField(fromInput, toInput);
    tieConversionField(toInput, fromInput);

    // Append the text fields to the containers
    fromCont.appendChild(fromInput);
    toCont.appendChild(toInput);

    // Store the menu's input fields and labels
    container.fromInput = fromInput;
    container.fromSym = fromCont.titleSpan;

    container.toInput = toInput;
    container.toSym = toCont.titleSpan;

    // Append the from and too input containers to the menu
    container.appendChild(fromCont);
    container.appendChild(toCont);

    // Return the container
    return container;
}


/**
 * Tie a number input field to an output HTMLInputElement.
 * The field will be given a default conversion rate of 1.0.
 * The field will also be given an onblur event handler which will print the field's
 * number value multiplied by its conversion rate in the output HTMLInputElement.
 *
 * @param {HTMLInputElement} numberInput
 *  A text input field
 * @param {HTMLInputElement} outputDisplay
 *  The output element
 */
function tieConversionField(numberInput, outputDisplay)
{
    // Store the outputDisplay and conversion rate
    numberInput.outputDisplay = outputDisplay;
    numberInput.rate = 1.0;

    // blur handler
    var blurFunc = function(){
        this.className += " clickable";

        // If the value of the input field is not a number
        if(isNaN(this.value))
        {
            // Set both the output value and input value to NaN
            this.value = "NaN";
            this.outputDisplay.value = "NaN";

            return;
        }

        // Otherwise, set the output value
        this.outputDisplay.value = this.rate * Number.parseFloat(this.value);
    };

    // Set the onblur handler
    numberInput.onblur = blurFunc;

    // Add the ENTER key handler
    numberInput.addEventListener("keydown", function(event){
        if(event.keyCode == 13)
            this.blur();
    });
}
