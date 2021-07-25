const discord = require("discord.js")

module.exports = {
    name: "serverinfo",
    category: "information",
    description: "Displays information about server",
    run: async(client, message, args) => {
        let region = { 
            "europe": ":flag_eu: Europe", 
            "india": ":flag_in: India",
            "eu-central": ":flag_eu: Central Europe",
              "singapore": ":flag_sg: Singapore",
              "us-central": ":flag_us: U.S. Central",
              "sydney": ":flag_au: Sydney",
              "us-east": ":flag_us: U.S. East",
              "us-south": ":flag_us: U.S. South",
              "us-west": ":flag_us: U.S. West",
              "eu-west": ":flag_eu: Western Europe",
              "vip-us-east": ":flag_us: VIP U.S. East",
              "london": ":flag_gb: London",
              "amsterdam": ":flag_nl: Amsterdam",
              "hongkong": ":flag_hk: Hong Kong",
              "russia": ":flag_ru: Russia",
              "southafrica": ":flag_za:  South Africa"
          } 
 
    let embed = new discord.MessageEmbed()
    .setAuthor("Server Information")
    .setThumbnail(message.guild.icon ? message.guild.iconURL({dynamic: true, format: 'png', size: 4096}) : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(message.guild.nameAcronym)}`)
    .addField('↣ Server Owner', message.guild.owner)
    .addField('↣ Server Region', region[message.guild.region])
    .addField('↣ Boost Count', message.guild.premiumSubscriptionCount ? message.guild.premiumSubscriptionCount : "0")
    .addField('↣ Premium Tier', message.guild.premiumTier ? message.guild.premiumTier : "0")
    .addField('↣ Verification Level', client.utils.capitalise(message.guild.verificationLevel.toLowerCase()))
    .addField('↣ User/Bot/Total Count', `↣ Total: \`${message.guild.members.cache.size}\`\n↣ Users: \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`\n↣ Bots: \`${message.guild.members.cache.filter(member => member.user.bot).size}\``)
    .addField('↣ Emoji Count', message.guild.emojis.cache.size)
    .addField('↣ Role Count', message.guild.roles.cache.size)
    .addField('↣ Created At', message.guild.createdAt.toUTCString())
     .setColor('RANDOM')
      message.channel.send(embed)
    }
}