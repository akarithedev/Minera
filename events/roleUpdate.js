const djs = require('discord.js')

module.exports.run = async(client, oldRole, newRole) => {
    let logs = await client.db.fetch(`logs_${newRole.guild.id}`)
    let logoption = await client.db.fetch(`logoption_${newRole.guild.id}`)
    
    if(logs === null) return;
    if(logoption === null) return;
    if(logoption === "on") {
       newRole.guild.fetchAuditLogs().then(logger => {
        let logchannel = client.channels.cache.get(logs)
      if(logchannel === null) return;
        let description = '';
            if(newRole.name != oldRole.name) description += `↣ Old Name: \`${oldRole.name}\`\n↣ New Name: \`${newRole.name}\``;
            if(newRole.hexColor != oldRole.hexColor)  description += `↣ Old Color: \`${oldRole.hexColor}\`\n↣ New Color: \`${newRole.hexColor}\``;
            if(newRole.hoist != oldRole.hoist) description += `↣ Hoisted Role(Old): \`${oldRole.hoist ? "True" : "False"}\`\n↣ Hoisted Role(New): \`${newRole.hoist ? "True" : "False"}\``;
            if(newRole.mentionable != oldRole.mentionable) description += `↣ Mentionable Role(Old): \`${oldRole.mentionable ? "True" : "False"}\`\n↣ Mentionable Role(New): \`${newRole.mentionable ? "True" : "False"}\``;

        const embed = new djs.MessageEmbed()
   .setAuthor('Role Updated')
   .setColor('RANDOM')
.setDescription(description)
.setFooter(`Role Name: ${newRole.name} | Updated by: ${logger.entries.first().executor.tag}`, logger.entries.first().executor.displayAvatarURL({dynamic: true, format: 'png'}))
.setColor('RANDOM')
            if(description.length == 0) return;
            return logchannel.send(embed)
       })
    }
}