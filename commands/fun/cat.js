const nekoClient = require('nekos.life')
const djs = require('discord.js')

module.exports = {
    name: 'cat',
    description: 'Sends random cat images (:',
    usage: '',
    aliases: [''],
    category: 'fun',
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let neko = new nekoClient()
        let data = await neko.sfw.meow()
        
        let embed = new djs.MessageEmbed()
        .setAuthor('Are you looking for a cat? Well here you go')
        .setImage(data.url)
        .setColor('BLACK')
        message.channel.send(embed)
    }
}