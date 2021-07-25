const Discord = require("discord.js");

module.exports = { 
name: "gblacklist", 
category: "owner",
usage: "gblacklist <guild_id>",
description: "Permanently blacklists a guild.",
ownerOnly: true,
run: async(client, message, args) => {
  const guild = client.guilds.cache.get(args[0]);
 console.log(guild)

    if (!guild) return message.channel.send("Please provide a guild id")

    let blacklist = await client.db.fetch(`gblacklist_${guild.id}`);
    if (blacklist === "Not") {
      client.db.set(`gblacklist_${guild.id}`, "Blacklisted");
      let embed = new Discord.MessageEmbed()
        .setDescription(`Successfully added \`${guild.name}\`(\`${guild.id}\`) to blacklist`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(`Guild Blacklisted by ${message.author.username}`);
      return message.channel.send(embed);
    } else if(blacklist === "Blacklisted") {
      client.db.set(`gblacklist_${guild.id}`, "Not");
      let embed = new Discord.MessageEmbed()
        .setDescription(`Successfully removed \`${guild.name}\`(\`${guild.id}\`) from blacklist`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(`Removed by ${message.author.username}`);
      return message.channel.send(embed)
    } else {
      if(blacklist === null) {
        client.db.set(`gblacklist_${guild.id}`, "Blacklisted");
      let embed = new Discord.MessageEmbed()
        .setDescription(`Successfully added \`${guild.name}\`(\`${guild.id}\`) to blacklist`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(`Guild Blacklisted by ${message.author.username}`)
        return message.channel.send(embed)
      }
    }
}
}