const axios = require('axios')
const djs = require('discord.js')

module.exports.run = async(client) => {
    console.log(`Logged in as ${client.user.tag}`)


const status = await client.db.fetch(`status`)
if(!status) client.user.setActivity('Type m!help');
if(status) { 
client.user.setActivity(status, {type: "STREAMING"});
}
    client.manager.init(client.user.id)
      setInterval(() => {
    axios.post(`https://discordbotlist.com/api/v1/bots/${client.user.id}/stats`, {
                "voice_connections": client.voice.connections.size,
                "users": client.users.cache.size,
                "guilds": client.guilds.cache.size
            }, 
            {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijc3NjE5OTQzMjAwOTU0Nzc3NiIsImlhdCI6MTYxNzQ2MjkwOH0.zkoJ1raMGbr4FuyHBB15AvqdqNQCX-bjI7xwsjQ0zvI"
                }
            });
        
      }, 300000)

   
}
