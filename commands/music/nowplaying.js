const Discord = require("discord.js")
const { Utils } = require("erela.js")
const moment = require("moment");
require("moment-duration-format")
module.exports = { 
name: 'nowplaying',
category: "music",
aliases: ["np", "now"],
description: "Shows the currrent playing song",
run: async(client, message, args) => {
  const embed = new Discord.MessageEmbed()
    const player = client.manager.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return message.reply("You need to be in a voice channel to use this command.");
    
      if (!player) return message.channel.send("There is nothing playing in this guild.");
    
      if(player.voiceChannel !== voiceChannel.id) {
        embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
        embed.setColor('RED')
        embed.setTimestamp()
        return message.channel.send(embed)
       }
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      return `${hrs.padStart(1, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
  }
    
    function idk(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      return `${hrs.padStart(1, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
  } 
    let player_duration = duration(player.queue.current.duration);
    let position = idk(player.position);
    
 
    embed.addField(`Now Playing`, player.queue.current.title)
    embed.addField(`Duration`, `${player.queue.current.isStream ? "`🔴 LIVE`": `[\`${position}/${player_duration}\`]`}`)
    embed.addField("Loop song", `${player.trackRepeat ? "Enabled" : "Disabled"}`)
    embed.addField("Loop queue", `${player.queueRepeat ? "Enabled" : "Disabled"}`)
    embed.addField("Channel", player.queue.current.author)
    embed.addField('Requested By', player.queue.current.requester.username)
    embed.setThumbnail(player.queue.current.thumbnail)
    embed.setColor("#0000A0")
    message.channel.send(embed)
}

}