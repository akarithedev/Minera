const Discord = require("discord.js")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "fun",
  usage: "(prefix)snipe",
  description: "Just for fun",
  run: async (client, message, args) => {

    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("No deleted messages were found.") 
      
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.avatarURL)
    .setDescription(msg.content)
    .setColor(msg.color)
    .setTimestamp()
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
   
    
  }
}