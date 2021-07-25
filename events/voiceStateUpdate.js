const Discord = require('discord.js')

module.exports.run = async(client, oldState, newState) => {
    let logs = await client.db.fetch(`logs_${newState.guild.id}`)
     let logoption = await client.db.fetch(`logoption_${newState.guild.id}`)
     
     if(logs === null) return;
     if(logoption === null) return;
    
    if(logoption === "on") {
 
    let logChannel = client.channels.cache.get(logs)
    if(logChannel === null) return;
 
 
 
        if(oldState.serverMute === false && newState.serverMute === true) {
            let serverMutev = new Discord.MessageEmbed()
            .setTitle('Voice Mute')
            .setColor('RANDOM')
            .setDescription(`🔇 Voice Muted <@${oldState.member.id}>`)
            .setTimestamp()
 
            logChannel.send(serverMutev);
        }
 
        if(oldState.serverMute === true && newState.serverMute === false) {
            let serverUnmutev = new Discord.MessageEmbed()
            .setTitle('Voice Unmute')
            .setColor('RANDOM')
            .setDescription(`🔊 Voice Unmuted <@${oldState.member.id}>`)
            .setTimestamp()
 
          logChannel.send(serverUnmutev);
        }
 
        if(oldState.serverDeaf === false && newState.serverDeaf === true) {
            let serverDeafv = new Discord.MessageEmbed()
            .setTitle('Voice Deafen')
            .setColor('RANDOM')
            .setDescription(`Voice Deafened <@${oldState.member.id}>`)
            .setTimestamp()
 
           logChannel.send(serverDeafv);
        }
 
        if(oldState.serverDeaf === true && newState.serverDeaf === false) {
            let serverUndeafv = new Discord.MessageEmbed() 
            .setTitle('Voice Undeafen')
            .setColor('RANDOM')
            .setDescription(`Voice Undeafened <@${oldState.member.id}>`)
            .setTimestamp()
 
            logChannel.send(serverUndeafv); 
        }
    
 
    if(!oldState.channel && newState.channel) {
        let voiceJoin = new Discord.MessageEmbed()
        .setTitle('Voice Channel Join')
        .setColor('RANDOM')
        .setDescription(`<@${oldState.member.id}> Joined \`${newState.channel.name}\` Channel`)
        .setTimestamp() 
       logChannel.send(voiceJoin);
    }
 
   if(oldState.channel && !newState.channel) {
        let voiceLeave = new Discord.MessageEmbed()
        .setTitle('Voice Channel Leave')
        .setColor('RANDOM')
        .setDescription(`<@${oldState.member.id}> Left \`${oldState.channel.name}\` Channel`)
        .setTimestamp()
 
  logChannel.send(voiceLeave); 
    }
    }
}