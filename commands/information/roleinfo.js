const djs = require('discord.js')

module.exports = {
    name: 'roleinfo',
    category: 'information',
    usage: 'roleinfo <@role/id/name>',
    description: 'Shows info about the given role',
    ownerOnly: false,
    aliases: ['rinfo'],
    run: async(client, message, args) => {
        let role;
        try {
        role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args.join(" "));
        
      
        const embed = new djs.MessageEmbed()
  
            
        if(!role) {
            embed.setDescription('Please provide a `role(name/id/mention)`')
            embed.setColor('RANDOM')
            embed.setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
            embed.setTimestamp()
            return message.channel.send(embed)
        }
             let memberCount = message.guild.members.cache.filter(m => m.roles.cache.some(r => r.name === role.name)).size
       let permissions = role.permissions.toArray().map(r => client.utils.capitalise(r.toLowerCase()));
            let members = message.guild.members.cache.filter(m => m.roles.cache.some(r => r.name === role.name)).map(member => `<@${member.id}>`);
            
            embed.setAuthor('Role Information')
            embed.setDescription(`↣ Role Name: \`${role.name}\`\n↣ Role ID: \`${role.id}\`\n↣ Mentionable?: \`${role.mentionable ? "Yes" : "No"}\`\n↣ Hoist?: \`${role.hoist ? "Yes" : "No"}\`\n↣ Role Position: \`${role.position}\`\n↣ Managed?: \`${role.managed ? "Yes" : "No"}\`\n↣ Color: \`${role.hexColor}\`\n↣ Member role count: \`${memberCount}\`\n↣ Members with this role: ${members.join("\n")}\n↣ Permissions: \`${permissions.join(", ")}\``)
            embed.setColor('RANDOM')
            embed.setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
            embed.setTimestamp()
            return message.channel.send(embed)
        } catch(err) {
            console.log(err)
            return message.channel.send(`ERROR: ${err.message}`)
        }
    }
}