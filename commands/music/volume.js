const discord = require("discord.js")
const color = "BLACK";

module.exports =  {
    name: "volume",
    category: "music",
    description: "Sets the volume",
    aliases: "volume",
    run: async(client, message, args) => {

const player = client.manager.get(message.guild.id);
const voiceChannel = message.member.voice.channel;
if(!voiceChannel) return message.channel.send("You need to be in a voice channel to change the volume.")
const embed = new discord.MessageEmbed()
if(!player || !player.queue) return message.channel.send("There is no player in this guild")
if(player.voiceChannel !== voiceChannel.id) {
    embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
    embed.setColor('RED')
    embed.setTimestamp()
    return message.channel.send(embed)
   }
const volume = args[0]; 
embed.setAuthor("Player Volume")
embed.setDescription(`The current volume is \`${player.volume}\``)
if(!volume) return message.channel.send(embed);
if(!Number(volume)) return message.channel.send("Please enter a valid number.");
if (volume > 100) return message.reply("Please enter a value between 1-100");

if(player.setVolume(volume)) {
embed.setAuthor("Player Volume")
embed.setDescription(`The volume has been set to ${args[0]}`)
embed.setColor(color) 
return message.channel.send(embed)
}
    }
}