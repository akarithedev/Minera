const djs = require('discord.js');

module.exports = {
    name: 'removemoney',
    category: 'economy',
    usage: 'removemoney <@user> <value>',
    description: 'Removes money from a user',
    ownerOnly: false,
    nsfwOnly: false,
    run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You don't have permission to use this command.")
     const mention = message.mentions.users.first();
     const value = parseInt(args[1]);
     if(!mention) return message.channel.send('Please mention someone');
      if(mention.bot) return message.channel.send('You cannot remove money from bots!')
      if(!args[1]) return message.channel.send('Please provide an amount of money')
      if(isNaN(args[1])) return message.channel.send('This is not a valid number of coins');
    const money = await client.db.fetch(`money_${message.guild.id}_${mention.id}`)

    if(!money) {
     let jEmbed = new djs.MessageEmbed()
     .setDescription("This user doesn't have any money in their account")
     .setColor('RED')
     .setTimestamp()
     await message.channel.send(jEmbed)
    } else {
      client.db.subtract(`money_${message.guild.id}_${mention.id}`, value).then
      let embed = new djs.MessageEmbed()
      .setAuthor('Remove Money Command')
      .setDescription(`${client.emoji.enabled} Successfully removed ${value} coin(s) from ${mention.username}`)
      .setColor('GREEN')
      .setTimestamp()
     await message.channel.send(embed)
    }
    }
}