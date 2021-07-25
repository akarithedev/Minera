const Discord = require('discord.js')
 
   module.exports = {
   name: "bal",
   aliases: ["balance"],
   category: "economy",
   description: "Displays your bank account",
   run: async (client, message, args) => {

let user = message.mentions.users.first() || message.author;

  let bal = await client.db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await client.db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;
  
  let moneyEmbed = new Discord.MessageEmbed()
  .setColor(`BLACK`)
  .setTimestamp()
  .setAuthor(`${user.username}'s Balance`)
  .setDescription(`**Money:** ${bal}$\n**Bank:** ${bank}$`);
  
  message.channel.send(moneyEmbed)
 } 
};

