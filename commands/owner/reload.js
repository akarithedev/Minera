const djs = require('discord.js')

module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  category: 'owner',
  usage: 'reload <command>',
  ownerOnly: true,
  run: async(client, message, args) => {
    
    if(!args[0]) return message.channel.send('You must provide a command for me to reload');

    let commandName = args[0].toLowerCase();
    let cmd = client.commands.get(commandName)

  try { 
     delete require.cache[require.resolve(`../../commands/${cmd.category}/${commandName}.js`)];
     client.commands.delete(commandName);
     const pull = require(`../../commands/${cmd.category}/${commandName}.js`);
     client.commands.set(commandName, pull);
    
    const embed = new djs.MessageEmbed()
 .setTitle('Command Reload')
 .setColor('BLACK')
 .setDescription(`Successfully reloaded \`${client.utils.capitalise(args[0])}\` command`)
 
   return message.channel.send(embed);
    } catch(e) {
        return message.channel.send(`${client.emoji.error} Error while reloading: \`${client.utils.capitalise(args[0])}\` command`);
    }
    
  }
  
}


