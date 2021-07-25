const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    category: "information",
    description: "Displays the author/target avatar in 4k format",
    usage: "avatar <target>",
    aliases: ["av"],
    run: async(client, message, args) => {

        const  target = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let embed = new MessageEmbed()
        .setAuthor(target.username)
        .setImage(target.displayAvatarURL({format: 'png', dynamic: true, size: 2048}))
        .setColor("BLUE")

        message.channel.send(embed)
    }
}