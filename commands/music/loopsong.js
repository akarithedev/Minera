const { MessageEmbed } = require("discord.js")
const { default_prefix } = require("../../config.json");
module.exports = {
    name: "loopsong",
    category: "music",
    usage: "No usage for this commmand",
    aliases: "repeat",
    description: "Loops the current track",
    run: async(client, message, args) => {
    
let prefix = await client.db.fetch(`prefix_${message.guild.id}`);
if(prefix === null)
prefix = default_prefix;

        const player = client.manager.get(message.guild.id)
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command.")
        const embed = new MessageEmbed()
          if (!player) return message.channel.send("There is nothing playing in this guild.");
          if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
            embed.setColor('RED')
            embed.setTimestamp()
            return message.channel.send(embed)
           }
            player.setTrackRepeat(!player.trackRepeat)
            let trackrepeat = player.trackRepeat ? "On" : "Off"; 
            
            embed.setDescription(`Looping for \`${player.queue.current.title}\` is now **${trackrepeat}**`)
            embed.setColor("CYAN")
            return message.channel.send(embed)
            

    }
}