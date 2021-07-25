const djs = require('discord.js')

module.exports = {
    name: 'removerole',
    description: 'Removes the added role',
    usage: 'removerole <@user> <@role>',
    category: 'moderation',
    aliases: ['remrole'],
    ownerOnly: false,
    run: async(client, message, args) => {
        const embed = new djs.MessageEmbed()
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            embed.setAuthor('MISSING PERMISSIONS')
            embed.setDescription('You lack the `Manage Roles` permission')
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
            embed.setAuthor('MISSING PERMISSIONS')
            embed.setDescription('I need the `Manage Roles` permission to')
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        const target = message.mentions.users.first();
        const role = message.mentions.roles.first();
        
        if(!target) return message.channel.send('You must mention someone')
        if(!role) return message.channel.send('You must mention a role')
        if(target.bot) return message.channel.send('You cannot remove roles from bots by the command')
        
        let targetUser = message.guild.members.cache.get(target.id)
        
        if (message.guild.me.roles.highest.position < role.position) return message.channel.send("The role you are trying to remove is under me. Put me over the role!")
   if(!targetUser.roles.cache.some(g => g.name === role.name)) return message.channel.send(`The user doesn't have this role`)     
   if(role) {
        targetUser.roles.remove(role.id).then
        embed.setAuthor('Role Removed')
        embed.setDescription(`Successfully removed ${role} role from ${target}`)
       embed.setColor('RANDOM')
       return message.channel.send(embed)
   }
        
    }
}