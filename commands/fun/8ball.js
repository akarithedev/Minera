const djs = require('discord.js');
const color = 'BLACK';

module.exports = {
  name: '8ball',
  category: 'fun',
  description: '8ball command',
  usage: '8ball are you dumb?',
  run: async(client, message, args) => {

   const answers = [
     'Yes',
     'Actually not',
     'Maybe',
     'No',
     'Of course',
     'I don\'t know',
     'I don\'t think so',
     'I\'m not sure',
     'There is a small chance',
     'I\'m fine',
     'Well, yes',
     'Uhh',
     'Ok',
     'Big chances'
   ];

  let response = answers[Math.floor(Math.random() * answers.length)];
let question = args.join(" ");

  if(!question) return message.channel.send("Please provide a question for me to answer.");
  if(!question.endsWith('?')) return message.channel.send('This is not a question. Please, add a `?` after the sentece');


 let embed = new djs.MessageEmbed()
  .setDescription(`**Question**: \`${question}\`\n**Answer**: \`${response}\``)
 .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true, size: 2048, format: 'png'}))
 .setColor(color)
 message.channel.send(embed)
  }
}

