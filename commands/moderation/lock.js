const djs = require('discord.js')
const color = 'BLACK';

module.exports = {
  name: 'lock',
  category: 'moderation',
  description: 'Locks the current channel',
  aliases: ['lockchannel', 'lchannel'],
  run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You're not allowed to use this command.`);
   if(!message.channel.permissionOverwrites.get(message.guild.id).allow === "SEND_MESSAGES") return message.channel.send('The channel is already locked.');
   
  if(message.channel.overwritePermissions([{
    id: message.guild.id,
    deny: ['SEND_MESSAGES']
  }])) {
    const embed = new djs.MessageEmbed()
    .setTitle('Channel Locked')
    .setDescription(`🔒 | ${message.channel} Has been locked!`)
    .setColor(color)
    .setTimestamp()
    return message.channel.send(embed)
  }
  }
}
