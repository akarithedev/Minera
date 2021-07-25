const djs = require('discord.js')
module.exports.run = async(client, oldUser, newUser) => {
    client.guilds.cache.forEach(async (guild) => {
      if(!guild.members.cache.get(newUser.id)) return;

      let logs = await client.db.fetch(`logs_${guild.id}`)
    let logoption = await client.db.fetch(`logoption_${guild.id}`)
    
    if(logs === null) return;
    if(logoption === null) return;
    let embed = new djs.MessageEmbed()
    if(logoption === "on") {
        let logchannel = client.channels.cache.get(logs)
        if(logchannel === null) return;
        
        if(newUser.username !== oldUser.username) {
            embed.setAuthor(`${oldUser.username} Changed their username`, oldUser.displayAvatarURL({format: 'png', dynamic: true, size: 4096}))
            embed.setDescription(`↣ Old Username: \`${oldUser.username}\`\n↣ New Username: \`${newUser.username}\``)
            embed.setColor('BLUE')
            embed.setTimestamp()
            return logchannel.send(embed)
        }
        if(newUser.avatarURL() !== oldUser.avatarURL()) {
            embed.setAuthor(`${oldUser.username} Changed their avatar`, oldUser.displayAvatarURL({format: 'png', dynamic: true, size: 4096}))
            embed.setDescription(`↣ Old avatar: [Link to old](${oldUser.displayAvatarURL({format: 'png', dynamic: true, size: 4096})})\n↣ New Avatar: [Link to new](${newUser.displayAvatarURL({format: 'png', dynamic: true, size: 4096})})`)
            embed.setColor('BLUE')
            embed.setTimestamp()
            return logchannel.send(embed)
        }
        console.log(`${newUser.avatarURL()} | ${newUser.displayAvatarURL()}`)
        if(newUser.discriminator !== oldUser.discriminator) {
            embed.setAuthor(`${oldUser.username} Changed their discriminator`, oldUser.displayAvatarURL({format: 'png', dynamic: true, size: 4096}))
            embed.setDescription(`↣ Old Discriminator: \`#${oldUser.discriminator}\`\n↣ New Discriminator: \`#${newUser.discriminator}\``)
            embed.setColor('BLUE')
            embed.setTimestamp()
            return logchannel.send(embed)
        }
        
    }

    })
}