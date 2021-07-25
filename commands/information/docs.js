const axios = require('axios');

module.exports = {
  name: 'docs',
  category: 'information',
  description: 'Shows docs from discord.js',
  aliases: ['djsdocs', 'djs'],
  usage: 'docs <query>',
  run: async(client, message, args) => {

    let text = args.join(" ");

  if(!text) return message.channel.send('You must provide something for me to search for!');

  const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(text)}`

  axios.get(url).then((embed) => {
    const { data } = embed

    if(data && !data.error) {
      return message.channel.send({embed: data})
    } else {
      return message.channel.send('Not a valid documentation.')
    }
  }).catch((err) => {
    console.error(err)
    return message.channel.send('Something went wrong.')
  })
  }
}