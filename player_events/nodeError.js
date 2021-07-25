module.exports = (client, node, error) => {
    console.log(`Node ${node.options.identifier} had an error: ${error.message}`)
}