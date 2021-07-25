const { MessageEmbed, Message }  = require("discord.js") 
const moment = require("moment");
require("moment-duration-format")
module.exports = { 
 name: "play", 
 category: "music", 
 aliases: ["p", "pplay"], 
 usage: "play <song_name> | <url> |",
 description: "plays a song from youtube and other sources",
 run: async (client, message, args) => { 
const voiceChannel = message.member.voice.channel;
if(!voiceChannel) {
   return message.channel.send("You need to be in a voice channel to use this command.")
}
const permissions = voiceChannel.permissionsFor(client.user);
     
if(!permissions.has("CONNECT")) {
    return message.channel.send("I can't join the voice channel")
}
if(!permissions.has("SPEAK")) {
return message.channel.send("I can't speak in the voice channel")
}
 
let songs;
    try {
  songs = args.join(" ");
        
let res = await client.manager.search(songs, message.author)

  const player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
    volume: 50,
    selfDeafen: true
  });

  if(player.voiceChannel !== voiceChannel.id) {
    let vEmbed = new MessageEmbed()
    .setDescription(`${client.emoji.no} You must be in the same channel as me!`)
    .setColor('RED')
    .setTimestamp()
    return message.channel.send(vEmbed)
   }

if(!songs) return message.channel.send("Please provide a song url or a search term")
if(player.voiceChannel !== voiceChannel.id) {
  let idEmbed = new MessageEmbed()
  .setDescription(`${client.emoji.no} You must be in the same channel as me!`)
  .setColor('RED')
  .setTimestamp()
  return message.channel.send(idEmbed)
 }
  if(player.state !== "CONNECTED") {
      player.connect()
  }
  
  if(res.loadType === "NO_MATCHES") {
    if (!player.queue.current) player.destroy();
         let nomatches = new MessageEmbed()
         .setDescription(`${client.emoji.error} | No matches were found!`)
            return message.channel.send(nomatches);
    }
  if(res.loadType === "PLAYLIST_LOADED") {
    player.queue.add(res.tracks);
   
    if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
      let playlist = new MessageEmbed()
      .setTitle('Playlist Added')
      .setDescription(`${client.emoji.enabled} | Enqueued \`${res.playlist.name}\` with **${res.tracks.length}** tracks`)
      .setColor('BLACK')
     return message.channel.send(playlist)
    }
 player.queue.add(res.tracks[0])
if(player.queue.length !==0) {
     let embed = new MessageEmbed()
   .setAuthor("Song Added To Queue")
   .setDescription(`${client.emoji.enabled} | \`${res.tracks[0].title}\` Has been added to the queue.`)
   .setColor("BLACK")
   .setTimestamp()
   .setThumbnail(res.tracks[0].thumbnail)
 return message.channel.send(embed);
}
  if (!player.playing && !player.paused && !player.queue.size) player.play(); 
    } catch(err) {
        let error = new MessageEmbed()
        .setTitle('ERROR')
        .setDescription(` ${client.emoji.error} | \`No lavalink nodes\``)
        .setColor('RED')
        return message.channel.send(error)
    }
     
 }
}