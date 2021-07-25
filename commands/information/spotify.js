const djs = require('discord.js')

module.exports = {
    name: "spotify",
    category: "information",
    usage: "spotify <user>",
    description: "Shows spotify info",
    ownerOnly: false,
    nsfwOnly: false,
    run: async(client, message, args) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
        let user = member.user;
        if(user.bot) return message.channel.send('Bots cannot listen to spotify :thinking:')
        let activities = user.presence.activities.filter(a => a.name == 'Spotify');
        if(activities.length == 0) {

            let embed = new djs.MessageEmbed()
            embed.setDescription(`${client.emoji.error} This user is not listening to Spotify!`)
            embed.setColor("RED")
            message.channel.send(embed)
            return;
        }
   

        for(const activity of activities) {
            
            let embed = new djs.MessageEmbed()
           
            if(activity !== null && activity.name === 'Spotify') {
               let trackImg = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
               let trackName = activity.details;
               let trackAuthor = activity.state;
               let trackAlbum = activity.assets.largeText;
               let trackUrl = `https://open.spotify.com/track/${activity.syncID}`;
               let trackDuration = await client.utils.getSongDuration(`https://api.spotify.com/v1/tracks/${activity.syncID}`);
                embed.setAuthor(user.username, "https://cdn.discordapp.com/emojis/653135129870336031.png?v=1")
                embed.setColor("BLUE")
                embed.addField("Track Info", [
                    `**» Title**: ${trackName}`,
                    `**» Author**: ${trackAuthor}`,
                    `**» Album**: ${trackAlbum}`,
                    `**» Duration**: ${trackDuration}`,
                    `**» Listen to song**: [Click Here](${trackUrl})`,
                    `**» Listener**: ${user.tag}`
                 ])
                embed.setThumbnail(trackImg)
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: 'png', size: 4096}))
                embed.setTimestamp()
  console.log(`${client.utils.getSongDuration(`https://api.spotify.com/v1/tracks/${activity.syncID}`)}`)
                return message.channel.send(embed)
            }
        
        }                       
    }
}
