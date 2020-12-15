// Import the library
import { Counter, countLayers } from './lib'

// Get the layers selected
let { selection } = figma.currentPage

// If nothing is selected consider all the nodes presented on the page to be selected
if (!selection.length) selection = figma.currentPage.children

// Count selected layers
const result: Counter = countLayers(selection as SceneNode[])

// Log the full result to a console
console.log(result)

// Compose the result message from the data received
const { total, hidden, topLevel } = result
const msg = `${total} elements in total, ${topLevel} top-level (${hidden} hidden)`

// Close the plugin and show the result
figma.closePlugin(msg)