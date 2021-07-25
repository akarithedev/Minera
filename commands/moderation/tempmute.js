const djs = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempmute',
    category: 'moderation',
    description: 'Temp mutes the user for the given time',
    usage: 'tempmute <@user> <time> <reason>',
    ownerOnly: false,
    nsfwOnly: false,
    run: async(client, message, args) => {
        let prefix = await client.db.fetch(`prefix_${message.guild.id}`)
   if(prefix === null) prefix = "m!";

const { mentions, member } = message;

 const embed = new djs.MessageEmbed()
    if(!member.hasPermission("MANAGE_ROLES")) {
  embed.setDescription(`${client.emoji.no} You don't have permission to mute this user!`)
  embed.setColor('RED')
  return message.channel.send(embed)
  }
  if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
  embed.setDescription(`${client.emoji.no} I do not have permission to mute this user!`)
  embed.setColor('RED')
  return message.channel.send(embed)
  }
    const target = mentions.users.first() || client.users.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ")
  if(!target) {
     embed.setDescription(`${client.emoji.no} Please mention or provide an user id`)
     embed.setColor('RED')
     return message.channel.send(embed)
    };

    if(target.id === message.author.id) {
    embed.setDescription(`You can't mute yourself`)
    embed.setColor('RED')
    return message.channel.send(embed)
  };

  if(target.bot) {
    embed.setDescription(`Bots cannot be muted`)
    embed.setColor('RED')
    return message.channel.send(embed)
  };

const targetUser = message.guild.members.cache.get(target.id);
if(!time) return message.channel.send('You must provide a time to mute that person!');
if(!reason) {
    reason = "No reason provided"
}

if(targetUser.roles.highest.position > message.member.roles.highest.position) {
			embed.setDescription(`${client.emoji.no} You cannot mute this user`)
            embed.setColor('RED')
    return message.channel.send(embed)
  }

  let mutedrole = await client.db.fetch(`muterole_${message.guild.id}`)
  if(mutedrole === null) mutedrole = "Muted";
let muterole = message.guild.roles.cache.find(r => r.name === mutedrole)


    if(!muterole) {
      embed.setDescription('Cannot find the muted role, are you sure that the muted role exists?')
      embed.setColor('RED')
      return message.channel.send(embed)
    };

if(targetUser.roles.cache.some(role => role.name === mutedrole)) {
embed.setDescription('The user is already muted!')
embed.setColor('RED')
return message.channel.send(embed)
}


  await targetUser.roles.add(muterole.id).then
  embed.setDescription(`${message.author.tag} Temp muted \`${target.username}\` for \`${time}\` | reason: \`${reason}\``)
  embed.setColor('GREEN')
  embed.setTimestamp()
 await message.channel.send(embed)

 let modlog = await client.db.fetch(`modlog_${message.guild.id}`)
if(modlog === null) return;
    
  let kickAction = new djs.MessageEmbed()
  .setAuthor('Action: TempMute')
  .addField('Target', `<@${target.id}>`)
  .addField('Moderator', message.author.tag)
  .addField('Duration', time)
  .addField('Reason', reason)
  .setTimestamp()
  .setColor('RED')
  let channel = client.channels.cache.get(modlog)
  if(channel === null) return;

  return channel.send(kickAction)
        
 setTimeout(async() => {
  await targetUser.roles.remove(muterole.id);
     
  let unmuteAction = new djs.MessageEmbed()
  .setAuthor('Action: Unmute')
  .addField('Target', `<@${target.id}>`)
  .addField('Moderator', message.author.tag)
  .addField('Reason', "Time's up")
  .setTimestamp()
  .setColor('GREEN')
     
return channel.send(unmuteAction)
  
 }, ms(time));
}
}