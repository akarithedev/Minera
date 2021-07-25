const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    category: "music",
    description: "Displays the guild queue",
    aliases: ["q"],
    run: async(client, message, args) => {

      const player = client.manager.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command.");
    
if(!player || !player.queue) return message.channel.send("There is nothing playing in this guild.");

const queue = player.queue;
    const embed = new MessageEmbed()
      .setAuthor(`Queue List`);

      if(player.voiceChannel !== voiceChannel.id) {
        let cEmbed = new MessageEmbed()
        .setDescription(`${client.emoji.no} You must be in the same channel as me!`)
        .setColor('RED')
        .setTimestamp()
        return message.channel.send(cEmbed)
       }
    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField("Current Song Playing", `[${queue.current.title}](${queue.current.uri})`);
 function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      return `${hrs.padStart(1, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
  }
     
    if (!tracks.length) embed.setDescription(`No songs were found in ${page > 1 ? `page ${page}` : "queue"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - ${track.title} (\`${track.isStream ? "🔴 LIVE" : `${duration(track.duration)}`}\`)`).join("\n"));
   
    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`); 
    message.channel.send(embed)
}
}