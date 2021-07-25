const ms = require('parse-ms')
const Discord = require('discord.js')
 
   module.exports = {
   name: "daily",
   category: "economy",
   description: "Collect your daily gift :)",
   run: async (client, message, args) => {
 
 
    let timeout = 86400000 
    let amount = parseInt(500)
 
 
 
    let daily = await client.db.fetch(`daily_${message.guild.id}_${message.author.id}`);
 
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
 
        message.channel.send(`You already collected ur daily reward, you can come back and collect it in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    } else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Daily Reward`, message.author.displayAvatarURL)
    .setColor("GREEN")
    .setDescription(`You have collected your amount of ${amount} Dollars`)
    message.channel.send(embed)
let date = Date.now()
    client.db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    client.db.set(`daily_${message.guild.id}_${message.author.id}`, date)
 
    }
 
 }
}
