const discord = require("discord.js");

module.exports = {
    name: "pay",
    category: "economy",
    usage: "pay <user> <amount>",
    description: "Pays the mentioned user :>",
    ownerOnly: false,
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        let amount = parseInt(args[1]);
        if(!user) return message.channel.send('Please mention someone for me to pay!');
        if(user.id === message.author.id) return message.channel.send('You can\'t pay yourself!');
        if(user.bot) return message.channel.send('You can\'t pay bots!');
        if(!args[1]) return message.channel.send('Please provide an amount of money to pay!');
        if(isNaN(args[1])) return message.channel.send('This is not a number');

        let credits = await client.db.fetch(`money_${message.guild.id}_${message.author.id}`);
        if(credits < amount) {
  return message.channel.send('You don\'t have that much money in your account to pay!')
        }
const embed = new discord.MessageEmbed()
.setTitle('Pay Command')
.setDescription(`Successfully sent ${amount} dollars to ${user.username}'s account`)
       message.channel.send(embed)

  client.db.add(`money_${message.guild.id}_${user.id}`, amount)
client.db.subtract(`money_${message.guild.id}_${message.author.id}`, amount)

   
    }
}
