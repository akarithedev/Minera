const djs = require('discord.js')

module.exports = {
    name: 'modlog',
    description: 'Set the mod log channel or disables it',
    usage: '<#channel>/ <remove>',
    category: 'moderation',
    aliases: [''],
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let { member, mentions } = message;
 let embed = new djs.MessageEmbed()
        if(!member.hasPermission('MANAGE_GUILD')) {
     embed.setTitle('Missing Permissions')
     embed.setDescription(`You need \`Manage Guild\` permission in order to use this command.`)
     embed.setColor('RED')
     embed.setTimestamp()
     embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
       return message.channel.send(embed)
    }

        let modlog = await client.db.fetch(`modlog_${message.guild.id}`)
        let channel = mentions.channels.first() || message.guild.channels.cache.get(args[1])
        let opt = args[0];

        if(!opt) {
            embed.setTitle('Missing Option')
            embed.setDescription('Please provide an option. Available options: `channel`, `remove`')
            embed.setTimestamp()
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
          return message.channel.send(embed)
        }

        if(opt === 'channel') {
            if(!args[1]) {
                if(!modlog) {
             embed.setColor('RED')
             embed.setTitle('Error')
             embed.setDescription('Please set the modlog channel(`mention/id`)')
             embed.setTimestamp()
             embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                return message.channel.send(embed)
            } else {
                embed.setColor('GREEN')
                embed.setDescription(`Current modlog channel: <#${modlog}>`)
                embed.setTimestamp()
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                   return message.channel.send(embed)
                }

            }

            client.db.set(`modlog_${message.guild.id}`, channel.id).then
         embed.setTitle('Success')
         embed.setDescription(`The modlog channel has been set to: ${channel}`)
         embed.setColor('GREEN')
         embed.setTimestamp()
         embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
       await message.channel.send(embed)

        }

        if(opt === 'remove') {
            if(!args[1]) {
                if(modlog) {
                  client.db.delete(`modlog_${message.guild.id}`).then
              embed.setTitle('Success')
              embed.setColor('GREEN')
              embed.setDescription(`${client.emoji.enabled} | The modlog has been disabled.`)
              embed.setTimestamp()
              embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                return message.channel.send(embed)
             } else {
                embed.setTitle('Error')
                embed.setColor('RED')
                embed.setDescription(`${client.emoji.error} | The modlog channel is not set.`)
                embed.setTimestamp()
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                return message.channel.send(embed)
            }
            }
        }
    }
}