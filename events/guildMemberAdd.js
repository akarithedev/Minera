const djs = require('discord.js')

module.exports.run = async(client, member) => {
    
    let welcomeChannel = await client.db.fetch(`welChannel_${member.guild.id}`)
    let welcomeMessage = await client.db.fetch(`welMessage_${member.guild.id}`)
    
    
    if(welcomeChannel === null) return;
    if(welcomeMessage === null) return;
    
    let msg = welcomeMessage;
    let msg1 = msg.replace('{user:mention}', `<@${member.user.id}>`)
    let msg2 = msg1.replace('{user:username}', member.user.username)
    let msg3 = msg2.replace('{guild:name}', member.guild.name)
    let msg4 = msg3.replace('{user:tag}', member.user.tag)
    let msg5 = msg4.replace('{guild:memberCount}', member.guild.memberCount)
    let embed = new djs.MessageEmbed()
    .setTitle('Welcomer')
    .setDescription(msg5)
    .setTimestamp()
    .setColor("RANDOM")
    let channel = client.channels.cache.get(welcomeChannel);
    if(channel === null) return;
    
    channel.send(embed)
}