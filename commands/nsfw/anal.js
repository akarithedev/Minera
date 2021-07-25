const nekoClient = require('nekos.life')
const djs = require('discord.js')

module.exports = {
    name: 'anal',
    description: 'Generates anal gifs/images for retards',
    nsfwOnly: true,
    ownerOnly: false,
    category: 'nsfw',
    run: async(client, message, args) => {
        const neko = new nekoClient()
        const data = await neko.nsfw.anal()
            let embed = new djs.MessageEmbed()
            .setTitle('Here you go')
            .setImage(data.url)
            .setColor('BLACK')
        message.channel.send(embed)
    }
}