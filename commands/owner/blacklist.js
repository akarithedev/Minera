const Discord = require("discord.js");

module.exports = { 
name: "blacklist", 
category: "owner",
usage: "blacklist <user>",
description: "blacklists a user",
ownerOnly: true,
run: async(client, message, args) => {
  const user = message.mentions.users.first() || client.users.cache.get(args[0])
  
    if (!user) return message.reply("Please mention someone or provide id for me to blacklist");
    if(user.id === client.user.id) return message.channel.send("You can't blacklist me, i'm ur child")
    let blacklist = await client.db.fetch(`blacklist_${user.id}`);
console.log(blacklist)
    if (blacklist === "Not") {
      client.db.set(`blacklist_${user.id}`, "Blacklisted");
      let embed = new Discord.MessageEmbed()
        .setDescription(`${user.username} has been blacklisted!`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Blacklisted by ${message.author.username}`)
     return message.channel.send(embed)
    } else if (blacklist === "Blacklisted") {
      client.db.set(`blacklist_${user.id}`, "Not");
      let embed = new Discord.MessageEmbed()
        .setDescription(`${user.username} has been un-blacklisted.`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(`Removed by ${message.author.username}`)
     return message.channel.send(embed)
    } else {
      if(blacklist === null) {
        client.db.set(`blacklist_${user.id}`, "Blacklisted");
      let embed = new Discord.MessageEmbed()
        .setDescription(`${user.username} has been blacklisted!`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Blacklisted by ${message.author.username}`)
        return message.channel.send(embed)
      }
    }
}
}