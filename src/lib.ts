// Export the type of the counting function
export interface Counter {
    total: number,
    hidden: number,
    topLevel?: number,
    types?: Record<string, number>
}

/** Checks if a node can have child nodes
 * @param {SceneNode} node a node in question
 */
export function supportsChildren(node: SceneNode):
    node is FrameNode | GroupNode | ComponentNode | InstanceNode | BooleanOperationNode {
    return node.type === 'FRAME' ||
        node.type === 'GROUP' ||
        node.type === 'COMPONENT' ||
        node.type === 'INSTANCE' ||
        node.type === 'BOOLEAN_OPERATION'
}

/** Counts layers taking their types into account
 * @param {SceneNode[]} nodes array of nodes to count
 */
export function countLayers(nodes: SceneNode[]): Counter {
    // Create a variable to store all the data
    const result: Counter = {
        total: 0,
        hidden: 0,
        topLevel: nodes.length,
        types: {}
    }

    // Traverse the selected nodes 
    for (const node of nodes) {
        // Increase the total (and the number of hidden if necessary)
        result.total++
        if (!node.visible) result.hidden++

        // Determine the type of the current node and increase the count for the corresponding type
        const { type } = node

        result.types[type] = !result.types[type] ? 1 : ++result.types[type]

        // If a node supports children, call this function on all its child nodes
        if (supportsChildren(node)) {
            // Cast a readonly type of SceneNode[] to a full-fledged SceneNode[]
            const children = node.children as SceneNode[]

            // Get the information about the node’s children
            const { total, hidden, types } = countLayers(children)

            // If the node is hidden, consider all its children as hidden too
            result.hidden += node.visible ? hidden : total
            result.total += total

            // Merge the type prop of the children nodes with the existing one
            for (const type in types) {
                const current = result.types[type]
                const additional = types[type]
                result.types[type] = !current ? additional : current + additional
            }
        }
    }

    return result
}
