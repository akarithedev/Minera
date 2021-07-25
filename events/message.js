const discord = require('discord.js')
const { default_prefix } = require('../config.json')


module.exports.run = async(client, message) => {
   
let prefix = await client.db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) {
    prefix = "m!"
}
    let blacklist = await client.db.fetch(`blacklist_${message.author.id}`);
    let gblacklist = await client.db.fetch(`gblacklist_${message.guild.id}`);

if(!message.guild) return;
if(!message.author) return;
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

let embed = new discord.MessageEmbed()
    if(blacklist === "Blacklisted") {
        embed.setTitle('Blacklisted')
        embed.setDescription(`${message.author}, You are blacklisted from using me`)
        embed.setColor('RED')
        return message.channel.send(embed)
    }
    if(gblacklist === "Blacklisted") return message.channel.send('This guild is blacklisted.')
  
    if (!message.member) message.member = await message.guild.fetchMember(message);
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    
    if(!command) return;
    
    
if(command.ownerOnly === true) {
 if(!client.owners.includes(message.author.id)) return message.channel.send('This command is available only for bot owners')
       }

 
    
    if(command.nsfwOnly === true) {
        if(!message.channel.nsfw) return message.channel.send('This command can be used only in NSFW channels!')
    }
    try {
        if(command)

command.run(client, message, args);
    } catch(e) {
        console.error(e)
        let errorEmbed = new discord.MessageEmbed() 
        .setDescription(`An error occured while running this command: \`${e.message}\``)
        .setColor('RED')
        return message.channel.send(errorEmbed)
    }
   
} 