/**
 * Helper functions for generating generic HTML code
 * 
 * @author Harsh Jain
 */


/**
 * Create an HTMLElement.
 * 
 * @param {string} type 
 *  The type or tag of the HTMLElement
 * @param {string} className 
 *  The CSS class name of the element
 * 
 * @returns {HTMLElement}
 *  The element
 */
function getElement(type, className)
{   
    // Create the element
    var element = document.createElement(type);

    // Set its class name
    element.className = className;

    // Return the element
    return element;
}


/**
 * Toggle the element of a container.
 * A container is simply an HTMLElement containing child elements.
 * 
 * @param {HTMLElement} container
 *  The container element 
 * @param {HTMLElement} element
 *  The element to be toggled 
 * @param {string} toggleClass
 *  Optional alternative toggle appearance CSS class
 */
function toggleElement(container, element, toggleClass)
{   
    var toggle = toggleClass ? toggleClass : "toggled";

    // If an element is already toggled, deselect it
    if(container.toggledElement)
        swapClasses(container.toggledElement, container.toggledElement.toggleClass, "clickable");
    
    // Toggle the given element
    swapClasses(element, "clickable", toggle);

    // Set the container's toggled element reference
    container.toggledElement = element;
    container.toggledElement.toggleClass = toggle;
}


/**
 * Given a container, find its child node with given inner HTML.
 * 
 * @param {HTMLElement} container 
 *  The container to search
 * @param {string} html
 *  The HTML to look for 
 * 
 * @returns {HTMLElement}
 *  The Child Node of container with inner HTML equaling html
 *  Null if no node is found
 */
function getElementByHTML(container, html)
{
    // Loop over all the child nodes
    for(let node of container.childNodes)
        // If HTML is found, return the node
        if(node.innerHTML == html)
            return node;
    
    // Return null if no node is found
    return null;
}


/**
 * Swap the CSS classes of an HTMLElement.
 * 
 * @param {HTMLElement} element 
 *  The Element to swap the classes of
 * @param {string} class1 
 *  A CSS class of element
 * @param {string} class2 
 *  The CSS class to swap in for class1
 */
function swapClasses(element, class1, class2)
{
    // Retrieve the class names
    var classNames = element.className.split(" ");
    var newClass = ""; 

    // Loop over each class
    for(let className of classNames)
        // Swap if class1 is found
        newClass += className == class1 ? class2 : className;
    
    // Reset the class name
    element.className = newClass;
}


/**
 * Given a container, clears it,
 * then displays given nodes.
 * 
 * @param {HTMLElement} container 
 *  The container element
 * @param {Array} nodes 
 *  An Array of HTMLElements to append to container
 */
function displayNodes(container, nodes)
{
    // Clear the container
    container.innerHTML = "";

    // Loop over each node
    for(let node of nodes) 
        // Append each to the container
        container.appendChild(node);
}


/**
 * Given an Array of strings, 
 * generate HTML such that each string in the array is on a seperate line.
 * 
 * @param {Array} lines 
 *  An Array of strings
 * 
 * @returns {string}
 *  The HTML
 */
function getTextLines(lines)
{
    var displayHTML = "";

    // Loop over each element in the lines array
    for(let i = 0; i < lines.length-1; i++)
        // Append it to the HTML, and skip a line
        displayHTML += lines[i] + "<br>";
    
    displayHTML += lines[lines.length-1];

    return displayHTML;
}