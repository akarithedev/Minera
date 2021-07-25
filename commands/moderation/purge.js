const djs = require('discord.js')

module.exports = {
    name: 'purge',
    aliases: ["clear", "bulk"],
    category: 'moderation',
    usage: "purge [amount]",
    nsfwOnly: false,
    ownerOnly: false,
    description: 'cleares the given amount of messages',
    run: async(client, message, args) => {
        let { member } = message;
        let amount = args[0]
        let embed = new djs.MessageEmbed()
        if(!member.hasPermission('MANAGE_MESSAGES')) {
            embed.setDescription(`${client.emoji.no} You need \`Manage Messages\` permission in order to use this command.`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
        if(!amount) {
            embed.setDescription(`${client.emoji.no} Please provide an amount`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
        if(isNaN(amount)) {
            embed.setDescription(`${client.emoji.no} You must provide an amount not a string`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(amount > 100) {
            embed.setDescription(`${client.emoji.no} You cannot delete more messages than 100!`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(amount < 1) {
            embed.setDescription(`${client.emoji.no} You cannot delete a smaller value than 1`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
       await message.channel.messages.fetch({ limit: amount }).then(async(messages) => {
    message.channel.bulkDelete(messages)
        embed.setDescription(`${client.emoji.yes} Successfully purged \`${amount}\` messages`)
        embed.setColor('GREEN')
           return message.channel.send(embed).then(async(msg) => await msg.delete({timeout: 5000}))
       })
    }
}