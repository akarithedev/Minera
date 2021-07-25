module.exports.run = async (client, error) => {
console.error(error)
let channel = client.channels.cache.get("803597276596928513");
channel.send(`An error occured before the client comes online: ${error.message}`)
}