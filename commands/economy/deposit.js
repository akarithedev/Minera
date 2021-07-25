const djs = require('discord.js')

module.exports = {
    name: 'deposit',
    category: 'economy',
    usage: 'deposit <value> (The value should be number not string)',
    description: 'Depositates the money from your pocket in your bank',
    nsfwOnly: false,
    ownerOnly: false,
    aliases: ['dep'],
    run: async(client, message, args) => {
 
    let money = await client.db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if(!args[0]) return message.channel.send('You must provide an amount')
    if(isNaN(args[0])) return message.channel.send('You must provide a number not a string');

    let amount = parseInt(args[0]);

    if(money < amount) return message.channel.send('You cannot deposit that value of money because you don\'t have them in your pocket!')
    
    client.db.add(`bank_${message.guild.id}_${message.author.id}`, amount)
    client.db.subtract(`money_${message.guild.id}_${message.author.id}`, amount)
    let embed = new djs.MessageEmbed()
    .setTitle('Deposit Command')
    .setDescription(`You have successfully deposited \`${amount}\` dollars in your bank account`)
    .setColor('GREEN')
    .setTimestamp()
   await message.channel.send(embed)
}
}