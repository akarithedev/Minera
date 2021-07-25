const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "nuke",
    category: "moderation",
    usage: "nuke",
    description: "Nukes the whole channel.",
    run: async(client, message, args) => {
      
 if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have permission to use this command.")

      let channel = client.channels.cache.get(message.channel.id)
                        let posisi = channel.position
                        channel.clone().then((channel2) => {
                            channel2.setPosition(posisi)
                            channel.delete()
                            const embed = new MessageEmbed()
                            .setTitle("Channel Nuked")
                            .setImage("https://media0.giphy.com/media/oe33xf3B50fsc/200.gif")
                            .setColor("ORANGE")
                            channel2.send(embed)
                        })
 
    }
}