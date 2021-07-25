const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    category: "information",
    description: "Displays info about user",
    run: async(client, message, args) => {

  const target = args[0];

  const embed = new MessageEmbed()

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: '<:Discord_Partner:836803617259782154> Discord Partner',
	BUGHUNTER_LEVEL_1: '<:Bug_Hunter:836533198178615317> Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: '<:Bug_Hunter:836533198178615317> Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: '<:HypeSquad_Events:836802790860521492> HypeSquad Events',
	HOUSE_BRAVERY: '<:HypeSquad_Bravery:836531992488181811> HypeSquad Bravery',
	HOUSE_BRILLIANCE: '<:HypeSquad_Brilliance:836532492512526386> HypeSquad Brilliance',
	HOUSE_BALANCE: '<:HypeSquad_Balance:836531683732750407> HypeSquad Balance',
	EARLY_SUPPORTER: '<:Early_Supporter:836532848735158272> Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: '<:Verified_Bot:836809376261865562> Verified Bot',
	VERIFIED_DEVELOPER: '<:Verified_Developer:836532656577576960> Verified Bot Developer',
    DISCORD_NITRO: '<a:Discord_Nitro:836532989226647553> Discord Nitro'
};

let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }


  const member = message.mentions.members.first() || message.guild.members.cache.get(target) || message.member;
        
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);

      let array = []
    if (member.user.presence.activities.length) {

      let data = member.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None"
        let xname = data[i].details || "None"
        let zname = data[i].state || "None"
        let type = data[i].type || "None"

        array.push(`\`${type.toLowerCase().split("_").map(t => client.utils.capitalise(t)).join(" ")}\``)
      }
    }

		const userFlags = await member.user.flags.toArray()
	const DEVICES = {
 web: "🌐 Web",
 desktop: "💻 Desktop",
 mobile: "📱 Mobile"
};


 let userDevice; 
if(member.presence.status == "offline") { userDevice = "Not available" } else if (!message.member.user.bot) { userDevice = DEVICES[Object.keys(member.presence.clientStatus)[0]] } else if (member.user.bot) { userDevice = "Not available" }


			embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png'}))
			embed.setColor('BLACK')
			embed.addField('User Information', [
				`**» Username:** ${member.user.username}`,
				`**» Discriminator:** ${member.user.discriminator}`,
				`**» ID:** ${member.id}`,
				`**» Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join("\n") : 'None'}`,
                `**» Bot?:** ${member.user.bot ? "Yes" : "No"}`,
                `**» Platform:** ${userDevice}`,
				`**» Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' })})`,
				`**» Created At:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**» Activity:** ${array ? array.join(", ") : "None"}`
			])
			embed.addField('Member Information', [
				`**» Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**» Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**» Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**» Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? client.utils.trimArray(roles) : 'None'}`
			])
      embed.setFooter(member.user.presence.status, stat[member.user.presence.status])

		return message.channel.send(embed);

    }
};