const nekoClient = require('nekos.life')
const djs = require('discord.js')

module.exports = {
    name: 'kiss',
    description: 'Kisses the mentioned user <3',
    nsfwOnly: false,
    ownerOnly: false,
    category: 'fun',
    run: async(client, message, args) => {
        
        const neko = new nekoClient()
        const data = await neko.sfw.kiss()
        const member = message.mentions.users.first()
        if(!member) return message.channel.send('Please mention someone to kiss')
        
        if(member.id === message.author.id) {
            let embed = new djs.MessageEmbed()
            .setAuthor(`${message.author.username} Kisses themselves...`)
            .setImage(data.url)
            .setColor('BLACK')
            return message.channel.send(embed)
        }
        if(member.id !== message.author.id) {
            let embed2 = new djs.MessageEmbed()
            .setAuthor(`${message.author.username} Kisses ${member.username}`)
            .setImage(data.url)
            .setColor('BLACK')
       return message.channel.send(embed2)
        }
    }
}