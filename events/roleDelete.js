const djs = require('discord.js')

module.exports.run = async(client, role) => {
    let logs = await client.db.fetch(`logs_${role.guild.id}`)
    let logoption = await client.db.fetch(`logoption_${role.guild.id}`)
    
    if(logs === null) return;
    if(logoption === null) return;
    
    if(logoption === "on") {
        role.guild.fetchAuditLogs().then(logger => {
        const embed = new djs.MessageEmbed()
        .setTitle('Role Deleted')
        .setDescription(`↣ Name: ${role.name}`)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(`Deleted by: ${logger.entries.first().executor.tag}`, logger.entries.first().executor.displayAvatarURL({dynamic: true, format: 'png'}))
        
        let logchannel = client.channels.cache.get(logs)
        if(logchannel === null) return;
        
        logchannel.send(embed)
        })
    }
}