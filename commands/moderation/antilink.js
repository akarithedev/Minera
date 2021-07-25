const djs = require('discord.js')

module.exports = {
     name: 'antilink',
     aliases: ['setantilink'],
     usage: 'antilink <value>',
     category: 'moderation',
     description: 'enables or disables the antilink',
     ownerOnly: false,
    nsfwOnly: false,
    run: async(client, message, args) => {
        const { member } = message;
        let argument = args[0];
        let embed = new djs.MessageEmbed()
        
        if(!member.hasPermission('MANAGE_GUILD')) {
            embed.setTitle('MISSING PERMISSIONS')
            embed.setDescription('You need the `Manage Guild` permission.')
            embed.setColor('RED')
            embed.setTimestamp()
            return message.channel.send(embed)
        }
        
        let antilink = await client.db.fetch(`antilink_${message.guild.id}`);
        
        if(!argument)  {
            embed.setTitle('Missing Option')
            embed.setDescription('Please provide a valid option. Available options: `on`, `off`')
            embed.setColor('RED')
            embed.setTimestamp()
            return message.channel.send(embed)
        }
        if(argument === "on") {
           if(!args[1]) {
               if(!antilink) {
                   client.db.set(`antilink_${message.guild.id}`, "on").then
                   embed.setTitle('AntiLink Enabled')
                   embed.setDescription(`${client.emoji.enabled} | AntiLink Has been enabled`)
                   embed.setColor('GREEN')
                   embed.setTimestamp()
                   return message.channel.send(embed)
               } else {
                   embed.setDescription(`${client.emoji.error} | The antilink is already enabled!`)
                   embed.setColor('RED')
                   embed.setTimestamp()
                   return message.channel.send(embed)
               }
           }
               
        }
        
        if(argument === "off") {
           if(!args[1]) {
               if(antilink) {
                   client.db.delete(`antilink_${message.guild.id}`).then
                   embed.setTitle('AntiLink Disabled')
                   embed.setDescription(`${client.emoji.enabled} | AntiLink has been disabled`)
                   embed.setColor('GREEN')
                   embed.setTimestamp()
                   return message.channel.send(embed)
               } else {
                   embed.setDescription(`${client.emoji.error} | The antilink is already disabled!`)
                   embed.setColor('RED')
                   embed.setTimestamp()
                   return message.channel.send(embed)
               }
           }
               
             
        }
    }
}