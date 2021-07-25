const discord = require("discord.js")
const color = "BLACK";

module.exports =  {
    name: "skip",
    category: "music",
    description: "Skips the current song",
    aliases: ["next", "s"],
    run: async(client, message, args) => {
    
const player = client.manager.get(message.guild.id);
const voiceChannel = message.member.voice.channel;
if(!voiceChannel) return message.channel.send("You need to be in a voice channel to skip the song.")

const embed = new discord.MessageEmbed()
if(!player) return message.channel.send("There is no player in this guild")
if(player.voiceChannel !== voiceChannel.id) {
  embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
  embed.setColor('RED')
  embed.setTimestamp()
  return message.channel.send(embed)
 }
  if(!player.queue.current) return message.channel.send("There is no song playing.");
    if(player.stop()) {
      embed.setDescription(`Skipped **${player.queue.current.title}**`)
      embed.setColor(color)
      embed.setTimestamp()
      return message.channel.send(embed)
  }
    }
}