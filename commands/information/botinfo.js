const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
    name: "botinfo",
    category: "information",
    aliases: ["stats"],
    description: "Displays the bot's information",
    run: async(client, message, args) => {
	
		const player = client.manager.get(message.guild.id);
		
		function duration(ms) {
			const sec = Math.floor((ms / 1000) % 60).toString()
			const min = Math.floor((ms / (1000 * 60)) % 60).toString()
			const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
			const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
			return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
		}
        const core = os.cpus()[0];
        let owners = client.owners.map(a => client.users.cache.get(a));
        if(owners === undefined) return message.channel.send(`Something went wrong`);
        if(owners !== undefined) {
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor('BLUE')
			.addField('Bot Statistics', [
                `<a:RainbowArr:836928702616829972> Developer(s): \`${owners.map(a => a.tag).join(', ')}\``,
                `<a:RainbowArr:836928702616829972> Bot Version: \`3.0.4 Beta\``,
				`<a:RainbowArr:836928702616829972> Command(s) Size: \`${client.commands.size}\``,
                `<a:RainbowArr:836928702616829972> Discord.Js Version: \`${djsversion}\``,
                `<a:RainbowArr:836928702616829972> Node.Js Version: \`${process.version}\``,
                `<a:RainbowArr:836928702616829972> Server(s) Size: \`${client.guilds.cache.size.toLocaleString()}\``,
                `<a:RainbowArr:836928702616829972> User(s) Size: \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``,
                `<a:RainbowArr:836928702616829972> Channel(s) Size: \`${client.channels.cache.size.toLocaleString()}\``,
                `<a:RainbowArr:836928702616829972> Music Player: ${player ? `${client.emoji.yes} The player is active` : `${client.emoji.no} No active player found`}`,
                `<a:RainbowArr:836928702616829972> Bot Uptime: \`${duration(client.uptime)}\``,
			])
			.addField('System Information', [
				`<a:RainbowArr:836928702616829972> Platform: \`${process.platform}\``,
				`<a:RainbowArr:836928702616829972> Arch: \`${os.arch}\``,
				`<a:RainbowArr:836928702616829972> CPU:`,
			`> Cores: \`${os.cpus().length}\``,
			`> Model: \`${core.model}\``,
			`> Speed: \`${core.speed}MHz\``,
                `<a:RainbowArr:836928702616829972> Memory Usage:`,
            `> RSS: \`${client.utils.formatBytes(process.memoryUsage().rss)}\``,
            `> Heap Used: \`${client.utils.formatBytes(process.memoryUsage().heapUsed)}\``,
            `> Heap Total: \`${client.utils.formatBytes(process.memoryUsage().heapTotal)}\``

			])
			.setTimestamp();

		message.channel.send(embed);
    }
    }
}