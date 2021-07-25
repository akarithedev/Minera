const djs = require('discord.js');

module.exports = {
    name: 'addmoney',
    category: 'economy',
    usage: 'addmoney <@user> <value>',
    description: 'Gives money to the mentioned user like a pay command',
    ownerOnly: false,
    nsfwOnly: false,
    run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You don't have permission to use this command.")
     const mention = message.mentions.users.first();
     const value = parseInt(args[1]);
     if(!mention) return message.channel.send('Please mention someone');
      if(mention.bot) return message.channel.send('You cannot add money to bots!')
      if(!args[1]) return message.channel.send('Please provide an amount of money')
      if(isNaN(args[1])) return message.channel.send('This is not a valid number of coins');

      client.db.add(`money_${message.guild.id}_${mention.id}`, value)
      let embed = new djs.MessageEmbed()
      .setAuthor('Add Money Command')
      .setDescription(`${client.emoji.enabled} You have added ${value} coin(s) to ${mention.username}'s balance`)
      .setColor('BLACK')
      .setTimestamp()
     await message.channel.send(embed)
      
    }
}