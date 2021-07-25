const { MessageEmbed }  = require("discord.js") 

module.exports = { 
 name: "stop", 
 category: "music", 
 aliases: ["leave"],
 description: "leaves from a voice channel",
 run: async (client, message, args) => { 

const player = client.manager.get(message.guild.id)
const voiceChannel = message.member.voice.channel;
if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music.")
const embed = new MessageEmbed()
  if(!player) return message.channel.send("There is nothing playing that i could stop.");
  if(player.voiceChannel !== voiceChannel.id) {
    embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
    embed.setColor('RED')
    embed.setTimestamp()
    return message.channel.send(embed)
   }
  player.destroy(message.guild.id);
  embed.setTitle("Player stopped")
  embed.setDescription("Succesfully left the voice channel.")
  embed.setColor("RED")
  return message.channel.send(embed)
  


 }
}