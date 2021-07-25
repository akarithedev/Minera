const djs = require('discord.js')

module.exports = {
    name: 'muterole',
    description: 'Sets or creates the muted role or removes it entirely',
    category: 'config',
    usage: 'muterole set <role name/id/mention>/muterole create <rolename>/muterole remove <role name/id/mention>',
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let embed = new djs.MessageEmbed()
        
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            embed.setDescription(`${client.emoji.no} You need \`Manage Roles\` permission in order to use this command.`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
            embed.setDescription(`${client.emoji.no} I don't have the required permissions!`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
        let muterole = args.slice(1).join(" ");
        let option = args[0];
        let muted = await client.db.fetch(`muterole_${message.guild.id}`)
        if(!option) {
            embed.setDescription(client.emoji.no + ' You must include an option. Available options: `create/set/remove`')
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
        if(option === "create") {
          
             if(!muterole) {
                 embed.setColor('RED')
                 embed.setDescription(`${client.emoji.no} You must include a name for muterole`)
                 return message.channel.send(embed)
             }
             if(!isNaN(muterole)) {
                 embed.setDescription(`${client.emoji.no} The argument should not be a number!`)
                 embed.setColor("RED")
                 return message.channel.send(embed)
             }
               if(muterole) {
                await message.guild.roles.create({ data: { name: muterole, color: 0x000000, permissions: [] } })
                let mutedrole = message.guild.roles.cache.find(r => r.name === muterole);
                message.guild.channels.cache.forEach(async(channel) => {
                  await channel.overwritePermissions([{
    id: mutedrole.id,
    deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SPEAK']
  }])
                })                                                                                 
                embed.setDescription(`${client.emoji.loading} Creating the muterole...`)
                embed.setColor('GREEN')
               let msg = await message.channel.send(embed)
               
               setTimeout(() => {
                 embed.setDescription(`${client.emoji.yes} Successfully created the muterole`)
                 embed.setColor('GREEN')
                 return msg.edit("", embed)
               }, 5000)
      
        }
        }
        if(option === "set") {
            if(!muted) {
                let idk = message.mentions.roles.first() || message.guild.roles.cache.get(muterole) || message.guild.roles.cache.find(r => r.name === muterole);
                if(!idk) {
                    embed.setDescription(`${client.emoji.no} Please mention or provide a role name/id`)
                    embed.setColor('RED')
                    return message.channel.send(embed)
                }
            
               if(idk) {
                embed.setDescription(`${client.emoji.loading} Setting the muterole and overwriting the channels...`)
                embed.setColor('GREEN')
                let msg = await message.channel.send(embed)
               
                
                setTimeout(() => {
                    client.db.set(`muterole_${message.guild.id}`, muterole).then
                    message.guild.channels.cache.forEach(async(channel) => {
                        await channel.overwritePermissions([{
    id: idk.id,
    deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SPEAK']
  }])
          })
                    embed.setDescription(`${client.emoji.yes} Successfully set the muterole`)
                    embed.setColor('GREEN')
                    return msg.edit("", embed)
                }, 5000)
               }
            } else {
                embed.setDescription(`${client.emoji.no} The mute role is already set!`)
                embed.setColor('RED')
                return message.channel.send(embed)
            }
        }
        if(option === "remove") {
            if(muted) {
                let mutedrole = message.guild.roles.cache.find(r => r.name === muted)
                if(mutedrole) {
                    embed.setDescription(`${client.emoji.loading} Removing the muted role...`)
                    embed.setColor('GREEN')
                    let msg = await message.channel.send(embed)
                    
                    setTimeout(() => {
                        client.db.delete(`muterole_${message.guild.id}`).then
                        message.guild.roles.cache.find(role => role.name === muted).delete()
                        embed.setDescription(`${client.emoji.yes} Successully removed the muted role from the config`)
                        embed.setColor('GREEN')
                        return msg.edit("", embed)
                    }, 5000)
                }
            } else {
                embed.setDescription(`${client.emoji.no} The muted role is not set`)
                embed.setColor('RED')
                return message.channel.send(embed)
            } 
        }
        
        
    }
   
}