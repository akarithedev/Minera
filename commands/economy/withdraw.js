const djs = require('discord.js')

module.exports = {
    name: 'withdraw',
    category: 'economy',
    usage: 'withdraw <value> (The value should be number not string)',
    description: 'Withdraws money from your bank account into your pocket',
    nsfwOnly: false,
    ownerOnly: false,
    aliases: ['wd'],
    run: async(client, message, args) => {
 
    let bank = await client.db.fetch(`bank_${message.guild.id}_${message.author.id}`)

    if(!args[0]) return message.channel.send('You must provide an amount')
    if(isNaN(args[0])) return message.channel.send('You must provide a number not a string');

    let amount = parseInt(args[0]);

    if(bank < amount) return message.channel.send('You cannot withdraw thiat value of money')
    
    client.db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    client.db.subtract(`bank_${message.guild.id}_${message.author.id}`, amount)
    let embed = new djs.MessageEmbed()
    .setTitle('Withdraw Command')
    .setDescription(`You have successfully withdrawed \`${amount}\` dollars from your bank account`)
    .setColor('GREEN')
    .setTimestamp()
   await message.channel.send(embed)
}
}