const djs = require('discord.js')

module.exports =  {
    name: 'badwords',
    aliases: ["bwords", "bs"],
    usage: "badwords add <word>, badwords list, badwords remove <word>",
    category: "moderation",
    nsfwOnly: false,
    ownerOnly: false,
    run: async(client, message, args) => {
        let argument = args[0]
        let badwords = await client.db.fetch(`badwords_${message.guild.id}.words`)
        let word = args.slice(1).join(" ");
        let embed = new djs.MessageEmbed()
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            embed.setDescription('You don\'t have enough permissions')
            embed.setColor('RED')
            return message.channel.send(embed)
        }
        if(!argument) {
            embed.setAuthor('Badwords Functions')
            embed.setDescription('**badwords list** - `displays the added blacklisted words`\n**badwords add** - `Add a blacklisted word`\n** badwords remove** - `Removes a blacklisted word from database`')
            embed.setColor('BLUE')
            embed.setTimestamp()
            return message.channel.send(embed)
        }
        if(argument === "add") {
            if(!word) {
                embed.setDescription(`${client.emoji.no} Please provide a bad word to add`)
                embed.setColor('RED')
                embed.setTimestamp()
                return message.channel.send(embed)
            }
  
            if(!client.db.fetch(`badwords_${message.guild.id}`)) client.db.set(`badwords_${message.guild.id}`, { 
                words: []
            })
            embed.setDescription(`${client.emoji.loading} Adding \`${word}\` to blacklisted words...`)
            embed.setColor('BLUE')
            let msg = await message.channel.send(embed)
            setTimeout(() => {
            client.db.push(`badwords_${message.guild.id}.words`, word);
            embed.setDescription(`${client.emoji.yes} Successfully added \`${word}\` to blacklisted words`)
            embed.setColor('GREEN')
            embed.setTimestamp()
            return msg.edit(embed)
            }, 3000)
        }
        if(argument === "list") {
            if(badwords) {
                embed.setDescription(`Current blacklisted words: ${badwords.map(a => `\`${a}\``).join(`, `)}`)
                embed.setColor('BLUE')
                embed.setTimestamp()
                return message.channel.send(embed)
            } else {
                embed.setDescription(`${client.emoji.no} No badwords were added`)
                embed.setColor('RED')
                embed.setTimestamp()
                return message.channel.send(embed)
            }
        }
        if(argument === "remove") {
            if(badwords) {
            if(!word) {
                embed.setDescription(`${client.emoji.no} Please provide a badword to remove`)
                embed.setColor('RED')
                embed.setTimestamp()
                return message.channel.send(embed)
            }
            embed.setDescription(`${client.emoji.loading} Removing \`${word}\` from blacklisted words`)
            embed.setColor('BLUE')
            embed.setTimestamp()
             let msg = await message.channel.send(embed)
            
                
             setTimeout(() => {
                 let newWords = [];
                 for(var i = 0; i < badwords.length; i++) {
                     if(badwords[i] != word) newWords.push(badwords[i]);
                 }
                 client.db.set(`badwords_${message.guild.id}`, { words: newWords });
                 embed.setDescription(`${client.emoji.yes} Successfully removed \`${word}\` from blacklisted words`)
                 embed.setColor('GREEN')
                 return msg.edit(embed)
             }, 3000)
           
            } else {
                embed.setDescription(`${client.emoji.no} No blacklisted words were found`)
                embed.setColor('RE')
                return message.channel.send(embed)
            }
                
        }
    }
}