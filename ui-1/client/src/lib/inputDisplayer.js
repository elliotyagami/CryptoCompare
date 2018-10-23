/**
 * Helper functions for displaying Input bars, Buttons, and Textfields
 * 
 * @requires displayer.js
 * 
 * @author Harsh Jain
 */


/**
 * Create n individual label Span.
 * A Label Span is simply an HTMLSpanELement.
 * The Label span contains a text label, which can be set as clickable.
 * 
 * @param {string} name 
 *  The text to be displayed inside the label
 * @param {number} flex 
 *  The flex value of the label span
 * @param {Function} func
 *  The onclick function of the span
 * @param {string} backgroundColor
 *  The Background Color of the span, CSS Format
 * @param {string} containerClassName
 *  The class name of the container span
 * @param {string} buttonClassName
 *  The class name of the actual clickable button
 * 
 * @returns {HTMLSpanElement}
 * The label Span
 */
function getSingleLabelSpanWithCLassName(name, flex, func, backgroundColor,
     containerClassName, buttonClassName)
{
    // Get the span
    var span = getSingleLabelSpan(name, flex, func, null);

    // Set the container class and background color
    span.className = containerClassName;
    span.style.backgroundColor = backgroundColor;

    // Set the button class name
    span.childNodes[0].className += " " + buttonClassName;
    
    // return the span
    return span;
}


/**
 * Create an individual Label Span.
 * A Label Span is simply an HTMLSpanELement.
 * The Label span contains a text label, which can be set as clickable.
 * 
 * @param {string} name 
 *  The text to be displayed inside the label
 * @param {number} flex 
 *  The flex value of the label span
 * @param {Function} func
 *  The onclick function of the span
 * @param {string} backgroundColor
 *  The Background Color of the span, CSS Format
 * 
 * @return {HTMLSpanElement}
 *  The Label Span
 */
function getSingleLabelSpan(name, flex, func, backgroundColor)
{
    // Create the container span
    var buttonCont = document.createElement("span");
    
    // Set the background color, if given
    if(backgroundColor)
        buttonCont.style.backgroundColor = backgroundColor;

    // Set the flex value
    buttonCont.style.flex = flex;

    // Create the label sapn
    var button = document.createElement("span");

    // If given, set its click function
    if(func)
    {
        button.onclick = func;
        button.className = "clickable";
    }

    // Display the labels name
    button.innerHTML = name;

    // Apend the label span to the container span
    buttonCont.appendChild(button);

    // Return the container span
    return buttonCont;
}


/**
 * Create an Input Text Field.
 * 
 * @param {number} fontSize 
 *  The font size of the Input Field
 * @param {number} maxLen  
 *  The max Length of the Input Field
 * @param {string} className    
 *  The class name of the text input
 * @param {Function} onclick   
 *  The onclick function of the input field
 * @param {Function} onblur
 *  The onblur function of the input field
 * 
 * @returns {HTMLInputElement}
 *  The element
 */
function getInputTextField(fontSize, maxLen, className = "clickable"
    , onclick = function(){ swapClasses(this, "clickable", ""); }
    , onblur = function(){ this.className += " clickable"; })
{
    // Create the field
    var input = document.createElement("input");

    // Set its font size
    input.style.fontSize = fontSize + "px";

    // Set max Length
    input.maxLength = maxLen;

    // Set its clickable appearance
    input.className = className;

    // Set event handlers
    input.onclick = onclick;
    input.onblur = onblur;

    return input
}


/**
 * Append HTMLSpan Elements to a container.
 * Intended for appending to input bars.
 * 
 * @param {HTMLElement} spanBar 
 *  The container
 * @param {Object} contents 
 *  An Object mapping span element display names to their onclick events
 */
function appendContents(spanBar, contents)
{
    // Loop over each name
    for(let name in contents)
    {   
        // Create the span element
        let span = document.createElement("span");

        // Add the display name to the span
        span.innerHTML += name;

        // If the name is mapped to an event handler
        if(contents[name])
        {   
            // Set the spans handler and appearance
            span.className += " clickable";
            span.onclick = contents[name];
        }

        // Append the span to the container
        spanBar.appendChild(span);
    }
}


/**
 * Create an empty Input Bar
 * An Input bar is simply an HTMLDivElement
 * with flex display and no padding
 * 
 * @param {string} title
 *  The title of the bar
 * @param {number} fontSize 
 *  The font size for the bar
 * @param {string} titleSpanClassName
 *  The class name of the title span of the bar
 * 
 * @returns {HTMLDivElement}
 *  The Bar
 */
function getInputBar(title, fontSize, titleSpanClassName = "flexible")
{
    // Create the bar
    var spanBar = getElement("div", "pad");

    // Set its fontSize
    spanBar.style.fontSize = fontSize + "px";

    // Create the flexible title span
    var titleSpan = getElement("span", titleSpanClassName);
    titleSpan.innerHTML = title;

    // Append the title span
    spanBar.appendChild(titleSpan);

    // Store the title span
    spanBar.titleSpan = titleSpan;

    // Set the toggle element to null
    spanBar.toggleElement = null;

    // Return the bar
    return spanBar;
}