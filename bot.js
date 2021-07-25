const moment = require("moment");
const Server = require('./Server');
require("moment-duration-format")
const discord = require("discord.js")
const { config } = require("dotenv")
const client = new discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], ws: {intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_PRESENCES', 'GUILD_INTEGRATIONS'], properties: { $browser: "Discord Android"}}}) 
const { Manager } = require("erela.js")
const fs = require("fs")
const { Database } = require("quickmongo");
const { default_prefix, owner, mongoURI} = require("./config.json");
const Util = require('./Util.js');
const Spotify = require("erela.js-spotify")
const { nodes } = require('./lavanodes.js')
const clientID = "a2ed820aaad44db8beda4a1435e20555";
const clientSecret = "9925467ad22542c6b66304e44fe1b20a";
const ascii = require('ascii-table')
client.manager = new Manager ({
nodes,
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
    plugins: [
    new Spotify({
      clientID,
      clientSecret
    })
  ]
})

  client.on("raw", (d) => client.manager.updateVoiceState(d));

client.db = new Database(mongoURI)

client.db.on('ready', () => {
  console.log('Succesfully connected to MongoDB')
})
client.db.on('error', (error) => {
  console.log('Cannot connect to the MongoDB\n', error);
})
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.categories = fs.readdirSync("./commands");
client.utils = new Util(client);
client.owners = owner;
client.events = new discord.Collection();
client.snek = require('axios')
new Server(client).start();

var text = fs.readFileSync('./emojis.json')
var obj = JSON.parse(text)
client.emoji = obj;
config({
    path: __dirname + "/.env"
});

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./player_events/', (err, files) => {
  if (err) return console.error(err);

 files.forEach(file => {
      const event = require(`./player_events/${file}`);

      let eventName = file.split(".")[0];
      console.log(`Loading ${eventName}`)
      client.manager.on(eventName, event.bind(null, client));

  });

})

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 4, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 7, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 10, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 15, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please do not spam!', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});

client.on('message', async (message) => {
  if(message.author.bot) return;
 let spam = await client.db.fetch(`spam_${message.guild.id}`);
if(!message.member.hasPermission('MANAGE_GUILD')) {
 if(spam === "on") {
   antiSpam.message(message)
   }
}
});
client.on('message', async (message) => {
 let antilink = await client.db.fetch(`antilink_${message.guild.id}`)
 if(message.author.bot) return;
 if(antilink === null) return;

  if(!message.member.hasPermission("MANAGE_GUILD")) {
  if(antilink === "on") {
      if(message.content.includes('http://') || message.content.includes('https://')) {
        let spEmbed = new discord.MessageEmbed()
          .setDescription(`${client.emoji.error} | Links are not allowed in this channel ${message.author}`)
          .setColor("RED")
          .setTimestamp()
          .setThumbnail(message.author.displayAvatarURL({dynamic: true, format: "png", size: 4096}))
        message.delete()
        return message.channel.send(spEmbed).then(msg => msg.delete({timeout: 5000}))
      } 
    }
  }
})
client.on("message", async(message) => {
    let badwords = await client.db.fetch(`badwords_${message.guild.id}.words`);
    let embed = new discord.MessageEmbed()

    if(badwords === null) return;
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.member.hasPermission('MANAGE_GUILD')) {
        let found = false;

        for(const badword of badwords) {
   if(message.content.toLowerCase().split(" ").join("").includes(badword.split(" ").join(""))) {
       if(message.author.bot) return;
       found = true;
   }

            if(found) {
                embed.setDescription(`${client.emoji.no} This word is blacklisted`)
       embed.setColor('RED')
       message.delete()
                return message.channel.send(embed).then(msg => msg.delete({timeout: 5000}))

            }

   }

    }
    })
client.login(process.env.TOKEN)