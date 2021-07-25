const discord = require("discord.js")

module.exports = {
    name: "howhorny",
    category: "fun",
    usage: "howhorny <user>/author",
    description: "shows how horny u are or how the user is",
    run: async(client, message, args) => {
    
    let list = Math.floor(Math.random() * 100);
    let embed = new discord.MessageEmbed()
   embed.setTitle("How Horny Machine")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) {
        embed.setDescription(`You are ${list}% horny`)
    } else {
        embed.setDescription(`${member} is ${list}% horny`)
    }
message.channel.send(embed)
    }
}