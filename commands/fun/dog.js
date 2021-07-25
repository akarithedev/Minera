const nekoClient = require('nekos.life')
const djs = require('discord.js')

module.exports = {
    name: 'dog',
    description: 'Sends random dog images (:',
    usage: '',
    aliases: ['woof'],
    category: 'fun',
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let neko = new nekoClient()
        let data = await neko.sfw.woof()
        
        let embed = new djs.MessageEmbed()
        .setAuthor('Are you looking for a dog? Well here you go')
        .setImage(data.url)
        .setColor('BLACK')
        message.channel.send(embed)
    }
}