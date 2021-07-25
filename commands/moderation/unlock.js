const djs = require('discord.js')
const color = 'BLACK';

module.exports = {
  name: 'unlock',
  category: 'moderation',
  description: 'Un-locks the locked channel',
  aliases: ['unlockchannel', 'ulchannel'],
  run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You're not allowed to use this command.`);
  
  if(message.channel.overwritePermissions([{
    id: message.guild.id,
    allow: ['SEND_MESSAGES']
  }])) {
    const embed = new djs.MessageEmbed()
    .setTitle('Channel Un-locked')
    .setDescription(`🔓 | ${message.channel} Has been Un-locked!`)
    .setColor(color)
    .setTimestamp()
    return message.channel.send(embed)
  }
  }
}