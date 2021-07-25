const { MessageEmbed } = require("discord.js")
const { default_prefix } = require("../../config.json");
module.exports = {
    name: "loop",
    category: "music",
    usage: "No usage for this commmand",
    aliases: "repeat",
    description: "Loops the whole queue",
    run: async(client, message, args) => {
    
let prefix = await client.db.fetch(`prefix_${message.guild.id}`);
if(prefix === null)
prefix = default_prefix;

        const player = client.manager.get(message.guild.id)
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command.")
    
          if (!player) return message.channel.send("There is nothing playing in this guild.");
          const embed = new MessageEmbed()
          if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
            embed.setColor('RED')
            embed.setTimestamp()
            return message.channel.send(embed)
           }

player.setQueueRepeat(!player.queueRepeat)
let queuerepeat = player.queueRepeat ? "On" : "Off"; 
embed.setDescription(`Looping queue is now ${queuerepeat}`)
embed.setColor("CYAN")
return message.channel.send(embed)

    }
}