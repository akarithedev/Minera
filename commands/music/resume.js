const { MessageEmbed }  = require("discord.js") 

module.exports = { 
 name: "resume", 
 category: "music", 
 description: "resume.",
 run: async (client, message, args) => { 


const player = client.manager.get(message.guild.id);
const voiceChannel = message.member.voice.channel;
if(!voiceChannel) return message.channel.send("You need to be in a voice channel to resume the music.")

const embed = new MessageEmbed()
  if(!player) return message.channel.send("There is nothing playing.");
  if(player.voiceChannel !== voiceChannel.id) {
    embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
    embed.setColor('RED')
    embed.setTimestamp()
    return message.channel.send(embed)
   }
if(!player.paused) return message.channel.send("The song is already resumed.");
          if(player.pause(false)) { 
              embed.setTitle(`Player resumed.`)
              embed.setDescription(`Resumed the music for you.`)
              embed.setColor("BLACK")
              embed.setThumbnail(client.user.displayAvatarURL())
              embed.setTimestamp()
              return message.channel.send(embed)
          }

    }
}