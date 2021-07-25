const { default_prefix } = require("../../config.json");
const discord = require("discord.js")

module.exports = {
    name: "setantispam",
    description: "Enables/Disables the anti spam system.",
    usage: "setantispam <option>",
    category: "moderation",
    aliases: ["antispam", "antis"],
    ownerOnly: false,
    nsfwOnly: false,
    run: async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You are not allowed to use this command.")
          }

let option = args[0];
let spam = await client.db.fetch(`spam_${message.guild.id}`);

if(!option) return message.channel.send('Please provide a valid option! `On` or `Off`');
let embed = new discord.MessageEmbed()

if(option === 'on') {
if(!args[1]) {
  if(!spam) {
    client.db.set(`spam_${message.guild.id}`, "on").then
    embed.setTitle('AntiSpam Enabled')
    embed.setDescription(`${client.emoji.enabled} AntiSpam has been successfully enabled.`)
    embed.setColor('GREEN')
    embed.setTimestamp()
    return message.channel.send(embed)
  } else {
    embed.setDescription(`${client.emoji.error} The antispam is already enabled!`)
    embed.setColor('RED')
    embed.setTimestamp()
    return message.channel.send(embed)
  }
} 
}


if(option === 'off') {
  if(!args[1]) {
    if(spam) {
      client.db.delete(`spam_${message.guild.id}`).then
      embed.setTitle('AntiSpam Disabled')
      embed.setDescription(`${client.emoji.enabled} AntiSpam has been successfully disabled.`)
      embed.setColor('GREEN')
      embed.setTimestamp()
      return message.channel.send(embed)
    } else {
      embed.setDescription(`${client.emoji.error} The antispam is already disabled!`)
      embed.setColor('RED')
      embed.setTimestamp()
      return message.channel.send(embed)
    }
  }
}
    }
}