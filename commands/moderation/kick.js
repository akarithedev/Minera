const djs = require('discord.js');

module.exports = {
name: 'kick',
description: 'Kicks the mentioned user with a reason for breaking the rules!',
category: 'moderation',
usage: 'kick <user> <reason>',
ownerOnly: false,
run: async(client, message, args) => {

 const { mentions } = message;
if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You're not allowed to use this command.");

const target = mentions.users.first();
let reason = args.slice(1).join(" ")

if(!target) {
    return message.channel.send('Please provide an user for me to kick')
}
if(target.id === message.author.id) return message.channel.send('You cannot kick yourself!');
if(!reason) {
  reason = "No reason provided"
};

const targetUser = message.guild.members.cache.get(target.id);

if(!targetUser.kickable) return message.channel.send('This user cannot be kicked out due to role hierarchy');
    
let embed = new djs.MessageEmbed()
.setTitle('User Kicked')
.setDescription(`Successfully kicked \`${target.username}\` (\`${target.id}\`) | Reason: \`${reason}\``)
.setColor('BLACK')
message.channel.send(embed)
    
let modlog = await client.db.fetch(`modlog_${message.guild.id}`)
if(modlog === null) return;
    
if(modlog) {
  let kickAction = new djs.MessageEmbed()
  .setAuthor('Action: Kick')
  .addField('Target', `<@${target.id}>`)
  .addField('Moderator', message.author.tag)
  .addField('Reason', reason)
  .setTimestamp()
  .setColor('RED')
  let channel = message.guild.channels.cache.get(modlog)
  if(channel === null) return;

  channel.send(kickAction)
}
target.send(`You were kicked out from ${message.guild.name} for \`${reason}\``).catch((err) => console.log('This user has dm disabled'));
targetUser.kick()

}
}