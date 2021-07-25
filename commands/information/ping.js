const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "information",
    description: "Get the ping of the bot",
    nsfwOnly: false,
    ownerOnly: false,
    run: (client, message, args) => {
    client.db.ping().then(async (db) => {
    let m = await message.channel.send("Pinging...");

    let ping = m.createdTimestamp - message.createdTimestamp;
    const embed = new MessageEmbed() 
    .addField(`🏓 Bot Latency`, `\`${ping}\`ms`) 
    .addField(`🌐 API Latency`, `\`${client.ws.ping}\`ms`)
    .addField(`Database Latency`, [
        `> **Read**: \`${db.read}\`ms`,
        `> **Write**: \`${db.write}\`ms`,
        `> **Average**: \`${db.average}\`ms`
    ])
    m.edit("", embed)
})
    }
}