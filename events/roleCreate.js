const djs = require('discord.js')

module.exports.run = async(client, role) => {
    
   let logs = await client.db.fetch(`logs_${role.guild.id}`)
   let logoption = await client.db.fetch(`logoption_${role.guild.id}`)
   
   if(logs === null) return;
    if(logoption === null) return;
    
    if(logoption === "on") {
    role.guild.fetchAuditLogs().then(logger => {
 
    const embed = new djs.MessageEmbed()
    .setTitle('Role Created')
    .setDescription(`↣ Role Name: \`${role.name}\`\n↣ Role ID: \`${role.id}\`\n↣ Hoist: \`${role.hoist ? "True" : "False"}\`\n↣ Mentionable: \`${role.mentionable ? "True" : "False"}\`\n↣ Role Color: \`${role.hexColor}\``)
    .setFooter(`Created by: ${logger.entries.first().executor.tag}`, logger.entries.first().executor.displayAvatarURL({dynamic: true, format: 'png'}))
    .setColor('RANDOM')
    .setTimestamp()
    let logchannel = client.channels.cache.get(logs)
    if(logchannel === null) return;
   
   return logchannel.send(embed)
    })
    }
}