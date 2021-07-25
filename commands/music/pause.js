const { MessageEmbed }  = require("discord.js") 

module.exports = { 
 name: "pause", 
 category: "music", 
 description: "pause the song and take a break :).",
 run: async (client, message, args) => { 
const embed = new MessageEmbed()

const player = client.manager.get(message.guild.id);
const voiceChannel = message.member.voice.channel;
if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command.");

if(!player) return message.channel.send("There is nothing playing.");

if(player.voiceChannel !== voiceChannel.id) {
    embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
    embed.setColor('RED')
    embed.setTimestamp()
    return message.channel.send(embed)
   }
   
if(player.paused) return message.channel.send("The song is already paused.");
          if(player.pause(true)) { 
              embed.setTitle(`Player paused.`)
              embed.setDescription(`Paused the music for you.`)
              embed.setColor("BLACK")
              embed.setThumbnail(client.user.displayAvatarURL())
              embed.setTimestamp()
              return message.channel.send(embed)
          }

    }
}