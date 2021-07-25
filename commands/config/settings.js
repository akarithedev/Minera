const discord = require("discord.js")
const { default_prefix } = require('../../config.json')

module.exports = {
    name: "settings",
    description: "Changes the bot settings like the prefix one",
    usage: "settings <option> <value>",
    category: "config",
    run: async(client, message, args) => {
     const idk = new discord.MessageEmbed()
        const option = args[0];
        
        if(!option) {
            idk.setTitle('Bot Settings')
            idk.setDescription('`prefix` - Changes the bot\'s prefix to a new one')
            idk.setColor('RANDOM')
            idk.setTimestamp()
            
           return message.channel.send(idk)
        }
        
        if(option === "prefix") {
            const prefix = args[1];
            
           let fetched = await client.db.fetch(`prefix_${message.guild.id}`)
         if(fetched === null) fetched = "m!";
          if(!prefix) {
            let embed = new discord.MessageEmbed()
            .setTitle('Prefix helper')
            .setDescription(`My prefix in this server is \`${fetched}\``)
            .setColor("BLACK")
            return message.channel.send(embed)
          } 
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You are not allowed or do not have permission to change prefix")
          }
          
          if(prefix.length > 3) {
            return message.channel.send("You can't set the prefix more than 3 args")
          }
        if(prefix !== "m!") {
        client.db.set(`prefix_${message.guild.id}`, prefix)  
        const success = new discord.MessageEmbed()
        .setTitle("Prefix Changed")
        .setDescription(`The prefix has been changed to: \`${prefix}\``)
        .setColor("BLACK")
        return message.channel.send(success)
        }
            
    if(prefix === default_prefix) {
        client.db.delete(`prefix_${message.guild.id}`)
        const reset = new discord.MessageEmbed()
        .setTitle("Prefix Reseted")
        .setDescription(`The prefix has been successfully reseted`)
        .setColor("BLACK")
        return message.channel.send(reset)
    }
        }
    }
}