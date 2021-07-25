const discord = require("discord.js")

module.exports = {
    name: "howgay",
    category: "fun",
    usage: "howgay <user>",
    description: "shows how gay u are or how the user is",
    run: async(client, message, args) => {
    
    let list = Math.floor(Math.random() * 100);
    let embed = new discord.MessageEmbed()
    embed.setTitle("Gayness Machine")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) {
        embed.setDescription(`You are ${list}% gay`)
    } else {
        embed.setDescription(`${member} is ${list}% gay`)
    }
        
message.channel.send(embed)
    }
}