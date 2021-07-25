const djs = require('discord.js')

module.exports.run = async(client, oldChannel, newChannel) => {
    let logs = await client.db.fetch(`logs_${newChannel.guild.id}`);
    let logoption = await client.db.fetch(`logoption_${newChannel.guild.id}`);
    
    if(logs === null) return;
    if(logoption === null) return;
    
    if(logoption === "on") {
        newChannel.guild.fetchAuditLogs().then(logger => {
        let description = '';
        
        if(newChannel.name != oldChannel.name) description += `↣ Old Channel: \`${oldChannel.name}\`\n↣ New Channel: \`${newChannel.name}\``;
        if(newChannel.parent != oldChannel.parent) description += `↣ Old Category: \`${oldChannel.parent.name}\`\n↣ New Category: \`${newChannel.parent.name}\``;
        if(newChannel.nsfw != oldChannel.nsfw) description += `↣ Nsfw(Old): \`${oldChannel.nsfw ? "True" : "False"}\`\n↣ Nsfw(New): \`${newChannel.nsfw ? "True" : "False"}\``;
        
        const embed = new djs.MessageEmbed()
        .setAuthor('Channel Updated')
        .setColor('RANDOM')
        .setDescription(description)
        .setFooter(`Channel Name: ${newChannel.name} | Updated by: ${logger.entries.first().executor.tag}`, logger.entries.first().executor.displayAvatarURL({dynamic: true, format: "png"}))
        
        let logchannel = client.channels.cache.get(logs)
        if(logchannel === null) return;
        
        if(description.length === 0) return;
        return logchannel.send(embed)
        })
    }
}