const djs = require('discord.js')

module.exports = async(client, player) => {
    player.destroy()
    let embed = new djs.MessageEmbed()
    .setTitle('Queue Ended')
    .setDescription('The queue is ended and i left the voice channel')
    .setColor('BLACK')
       let channel = client.channels.cache.get(player.textChannel);
        channel.send(embed)
}