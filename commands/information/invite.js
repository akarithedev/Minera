const discord = require("discord.js")

module.exports = {
    name: "invite",
    category: "information",
    description: "Get the invite links of this bot",
    run: async(client, message, args) => {
let embed = new discord.MessageEmbed()
.setDescription("You can invite me from the next links\n**Discord-Botlist.eu**: [Click Here](https://discord-botlist.eu/bots/776199432009547776)\n**Discordbotlist.com**: [Click Here](https://discordbotlist.com/bots/minera-bot)")
.setColor("BLUE")
message.channel.send(embed)
    }
}