const djs = require('discord.js')

module.exports.run = async(client, message, channel) => {
  client.snipes = new Map()
  if(!message.author) return;
  if(message.author.bot) return;
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.username,
    image:message.attachments.first() ? message.attachments.first().url : null,
    avatarURL:message.author.displayAvatarURL({dynamic: true, format: 'png'}),
    color:"BLUE"
  })
    
   let logs = await client.db.fetch(`logs_${message.guild.id}`)
   let logoption = await client.db.fetch(`logoption_${message.guild.id}`)
   
   if(logs === null) return;
    if(logoption === "off") return;
    
    if(logoption === "on") {
        let logchannel = client.channels.cache.get(logs)
        if(logchannel == null) return;
        let img = message.attachments.first() ? message.attachments.first().url : null
        const embed = new djs.MessageEmbed()


        .setAuthor(`${message.author.tag} Deleted their message`, message.author.displayAvatarURL({dynamic: true, format: 'png'}))
        .setDescription(`${message.content}`)
        .setColor('RANDOM')
        .setFooter(`In channel: #${message.channel.name}`)
        .setTimestamp()
        if(img) {
            embed.setImage(img)
        }
       return logchannel.send(embed)
    }
}