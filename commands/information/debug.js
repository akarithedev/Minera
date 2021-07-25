const djs = require('discord.js')
module.exports = {
    name: 'debug',
    aliases: ['playerstats', 'nodeinfo'],
    description: 'Shows the debug of the player',
    nsfwOnly: false,
    ownerOnly: false,
    category: 'information',
    run: async(client, message, args) => {
        let nodes = [...client.manager.nodes.values()]
        function duration(ms) {
			const sec = Math.floor((ms / 1000) % 60).toString()
			const min = Math.floor((ms / (1000 * 60)) % 60).toString()
			const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
			const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
			return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
		}
        let uptime1 = duration(nodes[0].stats.uptime)
        let uptime2 = duration(nodes[1].stats.uptime)
        let embed = new djs.MessageEmbed()
        .setAuthor(`${client.user.username} Player Stats`)
         .addField("Node 1 (Lavalink)", [
            `**Uptime**: \`${uptime1}\``,
             `**State**: \`Connected\``,
            `**Memory**:\n> Used: \`${client.utils.formatBytes(nodes[0].stats.memory.used)}\`\n> Free: \`${client.utils.formatBytes(nodes[0].stats.memory.free)}\`\n> Reservable: \`${client.utils.formatBytes(nodes[0].stats.memory.reservable)}\`\n> Allocated: \`${client.utils.formatBytes(nodes[0].stats.memory.allocated)}\``
        ])
        .addField("Node 2 (Lavalink)", [
            `**Uptime**: \`${uptime2}\``,
            `**State**: \`Connected\``,
            `**Memory**:\n> Used: \`${client.utils.formatBytes(nodes[1].stats.memory.used)}\`\n> Free: \`${client.utils.formatBytes(nodes[1].stats.memory.free)}\`\n> Reservable: \`${client.utils.formatBytes(nodes[1].stats.memory.reservable)}\`\n> Allocated: \`${client.utils.formatBytes(nodes[1].stats.memory.allocated)}\``
        ])
        .setThumbnail(client.user.displayAvatarURL({format: 'png', size: 4096}))
        message.channel.send(embed)
    }
}