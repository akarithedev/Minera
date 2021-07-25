const djs = require('discord.js')

module.exports = {
    name: 'setlog',
    aliases: ['setauditlog'],
    description: 'Sets the logs channel or deletes it',
    ownerOnly: false,
    nsfwOnly: false,
    category: 'config',
    usage: 'setlog channel <#channel>/ setlog remove',
    run: async(client, message, args) => {
        const { member, mentions } = message;
        let embed = new djs.MessageEmbed()
        if(!member.hasPermission('MANAGE_CHANNELS')) {
            embed.setTitle('MISSING PERMISSIONS')
            embed.setDescription('You need the `MANAGE CHANNELS` permission in order to use this command.')
            embed.setColor('RED')
            return message.channel.send(embed)
        }
    
        let logChannel = await client.db.fetch(`logs_${message.guild.id}`);
        let argument = args[0];

let channel;
try {
    channel = mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    if(!argument) {
        embed.setTitle('Not a valid option')
        embed.setDescription('Available options: `channel`, `remove`')
        embed.setColor('RED')
        return message.channel.send(embed)
    }
if(argument === 'channel') {
    if(!args[1]) {
       if(!logChannel) {
        embed.setTitle('No log chnanel')
        embed.setDescription('Please set the log channel(`mention/id`)')
        embed.setColor('RED')
        return message.channel.send(embed)
    } else {
        embed.setTitle(`Current Log Channel`)
        embed.setDescription(`Log Channel: <#${logChannel}>`)
        embed.setColor('GREEN')
        return message.channel.send(embed)
    }
    }

    client.db.set(`logs_${message.guild.id}`, channel.id)
    client.db.set(`logoption_${message.guild.id}`, 'on')
    embed.setTitle('Log Channel')
    embed.setColor('GREEN')
    embed.setDescription(`The log channel has been set to: ${channel}`)
    await message.channel.send(embed)
}
if(argument === 'remove') {
 if(!args[1]) {
     if(logChannel) {
         client.db.delete(`logs_${message.guild.id}`)
         client.db.delete(`logoption_${message.guild.id}`)
         embed.setTitle('Success')
         embed.setDescription('Successfully removed the audit logs')
         embed.setColor('GREEN')
         return message.channel.send(embed)
     } else {
         embed.setTitle('Error Occured')
         embed.setDescription('The log channel is not set! How i can remove it?')
         embed.setColor('RED')
         return message.channel.send(embed)
     }
 }
}
} catch(e) {
console.log(e)
}

    }
}