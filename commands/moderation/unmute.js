const djs = require('discord.js')

module.exports = {
  name: "unmute",
  description: "unmutes the mentioned user",
  usage: "unmute <@user>",
  aliases: [""],
  category: "moderation",
  ownerOnly: false,
  run: async(client, message, args) => {
      
   let prefix = await client.db.fetch(`prefix_${message.guild.id}`)
   let embed = new djs.MessageEmbed()
   if(prefix === null) prefix = "m!";

     if(!message.member.hasPermission("MANAGE_ROLES")) {
  embed.setDescription(`${client.emoji.no} You don't have permission to mute this user!`)
  embed.setColor('RED')
  return message.channel.send(embed)
  }
  if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
  embed.setDescription(`${client.emoji.no} I do not have permission to mute this user!`)
  embed.setColor('RED')
  return message.channel.send(embed)
  }

    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) {
     embed.setDescription(`${client.emoji.no} Please mention or provide an user id`)
     embed.setColor('RED')
        return message.channel.send(embed)
    };
      
if(user.id === message.author.id) {
    embed.setDescription(`You can't unmute yourself`)
    embed.setColor('RED')
    return message.channel.send(embed)
  };

  if(user.bot) {
    embed.setDescription(`Bots cannot be unmuted`)
    embed.setColor('RED')
    return message.channel.send(embed)
  };

let targetUser = message.guild.members.cache.get(user.id)
if(targetUser.roles.highest.position > message.member.roles.highest.position) {
			embed.setDescription(`${client.emoji.no} You cannot unmute this user!`)
            embed.setColor('RED')
    return message.channel.send(embed)
  }
let mutedrole = await client.db.fetch(`muterole_${message.guild.id}`)
if(mutedrole === null) mutedrole = "Muted";
const muterole = message.guild.roles.cache.find(r => r.name === mutedrole)

    if(!muterole) {
      embed.setDescription('Cannot find the muted role, are you sure that the muted role exists?')
      embed.setColor('RED')
      return message.channel.send(embed)
    };

if(!targetUser.roles.cache.some(role => role.name === mutedrole)) {
embed.setDescription('The user is not muted!')
embed.setColor('RED')
return message.channel.send(embed)
}
      
 targetUser.roles.remove(muterole.id).then
embed.setDescription(`Successfully unmuted \`${user.username}\` (\`${user.id}\`)`)
embed.setColor('BLACK')
await message.channel.send(embed)
      
 let modlog = await client.db.fetch(`modlog_${message.guild.id}`)
if(modlog === null) return;
  let unmuteAction = new djs.MessageEmbed()
  .setAuthor('Action: Unmute')
  .addField('Target', `<@${user.id}>`)
  .addField('Moderator', message.author.tag)
  .setTimestamp()
  .setColor('GREEN')
  let channel = message.guild.channels.cache.get(modlog)
  if(channel === null) return;

  return channel.send(unmuteAction)
  }
}