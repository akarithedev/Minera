const djs = require('discord.js')

module.exports = {
    name: 'goodbye',
    category: 'config',
    description: 'Sets the goodbye channel/message or removes it',
    usage: "goodbye <channel/message/removeall/remove>",
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let goodbyeChannel = await client.db.fetch(`gbyeChannel_${message.guild.id}`)
        let goodbyeMessage = await client.db.fetch(`gbyeMessage_${message.guild.id}`)
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
        if(!goodbyeChannel) {
            embed.setTitle('No goodbye channel')
            embed.setDescription('Please set the goodbye channel(`id/mention`)')
            embed.setColor('RED')
           return message.channel.send(embed)
        } else {
                embed.setTitle('Current Channel')
                embed.setDescription(`Current goodbye channel: <#${goodbyeChannel}>`)
                embed.setColor('GREEN')
               return message.channel.send(embed)
            
        }
    }
    
    client.db.set(`gbyeChannel_${message.guild.id}`, channel.id).then
    embed.setTitle('Goodbye Channel')
    embed.setDescription(`The goodbye channel has been set to: ${channel}`)
    embed.setColor('GREEN')
    return message.channel.send(embed)
}
   
if(argument === "message") {
    if(!args[1]) {
        if(!goodbyeMessage) {
            embed.setTitle('No goodbye message')
            embed.setDescription('Please set the goodbye message. You can use these too:\n**{user:mention}**\n**{user:username}**\n**{guild:name}**\n**{guild:memberCount}**\n**{user:tag}**')
            embed.setColor('RED')
            return message.channel.send(embed)
        } else {
            embed.setTitle('Current Message')
            embed.setDescription(`Current Goodbye Message: ${goodbyeMessage}`)
            embed.setColor('GREEN')
            return message.channel.send(embed)
        }
    } 
    let msg = args.slice(1).join(" ");
    client.db.set(`gbyeMessage_${message.guild.id}`, msg).then
    embed.setTitle('Goodbye Message')
    embed.setDescription(`The goodbye message has been set to: ${msg}`)
    return message.channel.send(embed)
}
   if(argument === "removeall") {
    if(!args[1]) {
        if(goodbyeChannel && goodbyeMessage) {
            client.db.delete(`gbyeChannel_${message.guild.id}`)
            client.db.delete(`gbyeMessage_${message.guild.id}`)
            embed.setTitle('Success')
            embed.setDescription('Successfully removed the goodbye channel/message')
            embed.setColor('GREEN')
           return message.channel.send(embed)
        } else {
            embed.setTitle('Error')
            embed.setDescription(`The goodbye channel/message is already removed!`)
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
                if(goodbyeChannel) {
                    client.db.delete(`gbyeChannel_${message.guild.id}`)
                    embed.setDescription(`Successfully removed the goodbye channel`)
                    embed.setColor('GREEN')
                    return message.channel.send(embed)
                } else {
                    embed.setDescription('The goodbye channel is not set!')
                    embed.setColor('RED')
                    return message.channel.send(embed)
                }
                
            }
            if(args[1] === "message") {
                if(goodbyeMessage) {
                    client.db.delete(`gbyeMessage_${message.guild.id}`)
                    embed.setDescription('Successfully removed the goodbye message')
                    embed.setColor('GREEN')
                    return message.channel.send(embed)
                } else {
                    embed.setDescription('The goodbye message is not set!')
                    embed.setColor('RED')
                    return message.channel.send(embed)
                }
            }
        }
    }
}