const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, guild) => {
    let prefix = await client.db.fetch(`prefix_${guild.id}`)
    if(!prefix) prefix = "m!"
    let owners = client.owners.map(a => client.users.cache.get(a));
    const embed = new MessageEmbed()
    .setDescription(`**Thank you for adding me**\nTo see a list of the commands just type \`${prefix}help\`\nIf you encounter any issues feel free to contact ${owners.map(u => u.tag).join(", ")}. Have a nice day <3`)
    embed.setColor('GREEN')
    embed.setFooter(`Made with love by Cobra`)
    embed.setTimestamp()
    let channel = guild.channels.cache.filter(c => c.type === 'text').random()
    channel.send(embed)
}