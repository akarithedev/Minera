const discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format")

module.exports = async(client, player, track) => {
    
  function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    return `${hrs.padStart(1, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
}
    let player_duration = duration(track.duration);
    
        const embed = new discord.MessageEmbed()
        .addField(`<a:bass_music:793442666087186452> Started Playing`, [
            `[${track.title}](${track.uri})`,
            `**Volume**: \`${player.volume}%\``,
            `**Bitrate**: \`512Kbps\``,
            `**Requester**: \`${track.requester.tag}\``,
        ])
        .setColor("BLUE")
        .setTimestamp()
        let channel = client.channels.cache.get(player.textChannel)
        let msg = await channel.send(embed)
        if(track.isStream) return;
    setTimeout(() => {
        if(track.isSeekable) {
        return msg.delete()
        }
        }, track.duration)
      }