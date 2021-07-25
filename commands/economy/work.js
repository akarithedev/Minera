const ms = require('parse-ms')
const Discord = require('discord.js')
 
   module.exports = {
   name: "work",
   category:"economy",
   description: "Work for a job and get money",
   run: async (client, message, args) => {

 let user = message.author;
    let author = await client.db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 3600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("BLACK")     
        .setTimestamp()    
        .setAuthor("Timeout")
  .setDescription(`${client.emoji.error} You have already worked\n\n**Take a rest and come back in ${time.minutes}min and ${time.seconds}sec** `);        
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Master Chief','Mechanic', 'Police Officer', 'Bot Developer', 'Discord Trust And Safety Admin', 'Memer', 'Theif', 'Robber', 'Medic', 'Firefighter', 'Dish washer']

        let result = Math.floor((Math.random() * replies.length));
        let amount = parseInt(Math.floor(Math.random() * 500) + 1);
        let embed1 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`${client.emoji.enabled} **You worked as a ${replies[result]} and earned ${amount} dollars**`)
        .setTimestamp()
        .setAuthor(user.username);
        message.channel.send(embed1)
        const test = Date.now();
     
        client.db.add(`money_${message.guild.id}_${user.id}`, amount)
   client.db.set(`work_${message.guild.id}_${user.id}`, test)
           
    }
}
 }