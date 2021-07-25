const djs = require('discord.js')
const ms = require('ms')
const parsems = require('parse-ms')
module.exports = {
    name: "seek",
    description: "Move the song from the current position to another position",
    usage: "seek [time]",
    aliases: [""],
    ownerOnly: false,
    nsfwOnly: false,
    category: "music",
    run: async(client, message, args) => {
        let embed = new djs.MessageEmbed()
        let time = args.join(" ");
        let player = client.manager.get(message.guild.id);
        let vc = message.member.voice.channel;
        
        if(!vc) {
            embed.setDescription(`${client.emoji.no} You need to be in a voice channel to use this command.`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
       if(!player || !player.queue.current) {
           embed.setDescription(`${client.emoji.no} There is nothing playing.`)
           embed.setColor('RED')
           return message.channel.send(embed)
       }
        if(player.voiceChannel !== vc.id) {
            embed.setDescription(`${client.emoji.no} You must be in the same channel as me!`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
        
        if(!time) {
            embed.setDescription(`${client.emoji.no} You should provide a valid time!`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        
        if(!player.queue.current.isSeekable) {
            embed.setDescription(`${client.emoji.no} The song is not seekable!`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(ms(time) > player.queue.current.duration) {
            embed.setDescription(`${client.emoji.no} Cannot seek because the given time is bigger than the song duration!`)
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(!ms(time)) {
            embed.setDescription(`${client.emoji.no} Not a valid time. Make sure that your arguments contains \`h, m or s\`\nExample: \`seek 1m\``)
        }
        embed.setDescription(`${client.emoji.loading} Seeking to **${time}**...`)
        embed.setColor('BLUE')
        let msg = await message.channel.send(embed)
        setTimeout(() => {
        player.seek(ms(time)).then
            embed.setDescription(`${client.emoji.yes} Seeked to **${time}**`)
            embed.setColor('GREEN')
            return msg.edit(embed)
        
        }, 5000)
    }
}