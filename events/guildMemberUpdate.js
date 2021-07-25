const djs = require('discord.js')

module.exports.run = async(client, oldMember, newMember) => {
    let logs = await client.db.fetch(`logs_${newMember.guild.id}`)
    let logoption = await client.db.fetch(`logoption_${newMember.guild.id}`)
    
   if(logs === null) return;
   if(logoption === null) return;
    
    let logchannel = client.channels.cache.get(logs)
    if(logchannel === null) return;
    
    
    let embed = new djs.MessageEmbed()
    
    if(logoption === "on") {
    if(newMember.nickname !== oldMember.nickname) {
        embed.setAuthor(`${oldMember.user.username} Changed their nickname`, oldMember.user.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
        embed.setDescription(`↣ Old Nickname: \`${oldMember.nickname ? oldMember.nickname : "None"}\`\n↣ New Nickname: \`${newMember.nickname ? newMember.nickname : "None"}\``)
        embed.setColor('BLUE')
        embed.setTimestamp()
        return logchannel.send(embed)
    }
    if(oldMember.roles.cache.size < newMember.roles.cache.size) {
            let role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();
 
           embed.setAuthor(`Roles updated for ${newMember.user.username}`, newMember.user.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
           embed.setDescription(`${client.emoji.yes} Added \`${role.name}\` to ${newMember.user}`)
           embed.setColor('GREEN')
           embed.setTimestamp()
        return logchannel.send(embed)
        }

        if(oldMember.roles.cache.size > newMember.roles.cache.size) {
            let role = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();
            
            embed.setAuthor(`Roles updated for ${newMember.user.username}`, newMember.user.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
            embed.setDescription(`${client.emoji.no} Removed \`${role.name}\` from ${newMember.user}`)
            embed.setColor('RED')
            embed.setTimestamp()
            return logchannel.send(embed)
        }
}
}