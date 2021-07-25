const djs = require('discord.js')

module.exports = {
    name: 'welcome',
    category: 'config',
    description: 'Sets the welcome channel/message or removes it',
    usage: "welcome <channel/message/removeall/remove>",
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let welcomeChannel = await client.db.fetch(`welChannel_${message.guild.id}`)
        let welcomeMessage = await client.db.fetch(`welMessage_${message.guild.id}`)
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        let argument = args[0];
      let embed = new djs.MessageEmbed()
       if(!message.member.hasPermission('MANAGE_GUILD')) {
          embed.setTitle('Missing Permission')
          embed.setDescription('You lack the `Manage Guild` permission')
          embed.setColor('BLACK')
          return message.channel.send(embed)
      }
        if(!argument) {
            embed.setTitle('Argument Missing')
            embed.setDescription('Available Options: `channel/message/removeall/remove`')
            return message.channel.send(embed)
        }
if(argument === "channel") {
    if(!args[1]) {
        if(!welcomeChannel) {
            embed.setTitle('No welcome channel')
            embed.setDescription('Please set the welcome channel(`id/mention`)')
            embed.setColor('RED')
           return message.channel.send(embed)
        } else {
                embed.setTitle('Current Channel')
                embed.setDescription(`Current welcome channel: <#${welcomeChannel}>`)
                embed.setColor('GREEN')
                return message.channel.send(embed)
            
        }
    }
    
    client.db.set(`welChannel_${message.guild.id}`, channel.id).then
    embed.setTitle('Welcome Channel')
    embed.setDescription(`The welcome channel has been set to: ${channel}`)
    embed.setColor('GREEN')
    return message.channel.send(embed)
}
   
if(argument === "message") {
    if(!args[1]) {
        if(!welcomeMessage) {
            embed.setTitle('No welcome message')
            embed.setDescription('Please set the welcome message. You can use these too:\n**{user:mention}**\n**{user:username}**\n**{guild:name}**\n**{guild:memberCount}**\n**{user:tag}**')
            embed.setColor('RED')
           return message.channel.send(embed)
        } else {
            embed.setTitle('Current Message')
            embed.setDescription(`Current Welcome Message: ${welcomeMessage}`)
            embed.setColor('GREEN')
           return message.channel.send(embed)
        }
    }
    let msg = args.slice(1).join(" ");
    client.db.set(`welMessage_${message.guild.id}`, msg).then
    embed.setTitle('Welcome Message')
    embed.setDescription(`The welcome message has been set to: ${msg}`)
    return message.channel.send(embed)
}
   if(argument === "removeall") {
    if(!args[1]) {
        if(welcomeChannel && welcomeMessage) {
            client.db2.delete(`welChannel_${message.guild.id}`)
            client.db2.delete(`welMessage_${message.guild.id}`)
            embed.setTitle('Success')
            embed.setDescription('Successfully removed the welcome channel/message')
            embed.setColor('GREEN')
          return  message.channel.send(embed)
        } else {
            embed.setTitle('Error')
            embed.setDescription(`The welcome channel/message is already removed!`)
            embed.setColor('RED')
           return message.channel.send(embed)
        }
    }
  
}
        if(argument === "remove") {
            if(!args[1]) {
                embed.setDescription('Please provide a valid welcome option. Available: `channel/message`')
                embed.setColor('RED')
                return message.channel.send(embed)
            }
            if(args[1] === "channel") {
                if(welcomeChannel) {
                    client.db.delete(`welChannel_${message.guild.id}`).then
                    embed.setDescription(`Successfully removed the welcome channel`)
                    embed.setColor('GREEN')
                    return message.channel.send(embed)
                } else {
                    embed.setDescription('The welcome channel is not set!')
                    embed.setColor('RED')
                    return message.channel.send(embed)
                }
                
            }
            if(args[1] === "message") {
                if(welcomeMessage) {
                    client.db.delete(`welMessage_${message.guild.id}`).then
                    embed.setDescription('Successfully removed the welcome message')
                    embed.setColor('GREEN')
                    return message.channel.send(embed)
                } else {
                    embed.setDescription('The welcome message is not set!')
                    embed.setColor('RED')
                    return message.channel.send(embed)
                }
            }
        }
    }
}