const djs = require('discord.js')

module.exports.run = async(client, oldMessage, newMessage) => {
    if(!newMessage.author) return;
    if(newMessage.author.bot) return;
   let logs = await client.db.fetch(`logs_${newMessage.guild.id}`)
   let logoption = await client.db.fetch(`logoption_${newMessage.guild.id}`)
   
   if(logs === null) return;
    if(logoption === "off") return;
    
    if(logoption === "on") {
        let logchannel = client.channels.cache.get(logs)
        if(logchannel == null) return;
        
        const embed = new djs.MessageEmbed()
        .setAuthor(`${newMessage.author.tag} Updated their message`, newMessage.author.displayAvatarURL({dynamic: true, format: 'png'}))
        .setDescription(`↣ Old Message: ${oldMessage.content}\n↣ New Message: ${newMessage.content}`)
        .setColor('RANDOM')
        .setFooter(`In channel: #${newMessage.channel.name}`)
        .setTimestamp()
       return logchannel.send(embed)
    }
}