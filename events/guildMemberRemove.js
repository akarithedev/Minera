const djs = require('discord.js')

module.exports.run = async(client, member) => {
    
    let goodbyeChannel = await client.db.get(`gbyeChannel_${member.guild.id}`)
    let goodbyeMessage = await client.db.get(`gbyeMessage_${member.guild.id}`)
    
    
    if(goodbyeChannel === null) return;
    if(goodbyeMessage === null) return;
    
    let msg = goodbyeMessage;
    let msg1 = msg.replace('{user:mention}', `<@${member.user.id}>`)
    let msg2 = msg1.replace('{user:username}', member.user.username)
    let msg3 = msg2.replace('{guild:name}', member.guild.name)
    let msg4 = msg3.replace('{user:tag}', member.user.tag)
    let msg5 = msg4.replace('{guild:memberCount}', member.guild.memberCount)
    let embed = new djs.MessageEmbed()
    .setTitle('Goodbye')
    .setDescription(msg5)
    .setColor("RANDOM")
    .setTimestamp()
    let channel = member.guild.channels.cache.get(goodbyeChannel);
    if(channel === null) return;
    
    channel.send(embed)
    
}