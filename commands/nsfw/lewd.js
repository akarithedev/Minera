const nekoClient = require('nekos.life')
const djs = require('discord.js')

module.exports = {
    name: 'lewd',
    description: 'Generates lewd images for retards',
    nsfwOnly: true,
    ownerOnly: false,
    category: 'nsfw',
    run: async(client, message, args) => {
        
        const neko = new nekoClient()
        const data = await neko.nsfw.neko()
       
        let embed = new djs.MessageEmbed()
        .setTitle('Here you go')
        .setImage(data.url)
        .setColor('BLACK')
        return message.channel.send(embed)
    }
}