const djs = require('discord.js')

module.exports.run = async(client, channel) => {
    let logs = await client.db.fetch(`logs_${channel.guild.id}`)
    let logoption = await client.db.fetch(`logoption_${channel.guild.id}`)
    
    if(logs === null) return;
    if(logoption === null) return;
    
    if(logoption === "on") {
     channel.guild.fetchAuditLogs().then(logger => {
      
     let logchannel = client.channels.cache.get(logs)
     if(logchannel === null) return;
     
     let description = `↣ Channel Name: \`${channel.name}\`\n↣ Channel Type: \`${client.utils.capitalise(channel.type)}\``;
     if(description.length === 0) return;
        
     const embed = new djs.MessageEmbed()
     .setAuthor('Channel Deleted')
     .setDescription(description)
     .setColor('RANDOM')
     .setFooter(`Deleted by: ${logger.entries.first().executor.tag}`, logger.entries.first().executor.displayAvatarURL({dynamic: true, format: "png"}))
     return logchannel.send(embed)   
     })
    }
}