    const express = require('express')
    const bodyParser = require('body-parser')
    let app = express();
    let port = process.env.PORT || 30692;
  let jsonParser = bodyParser.json();

module.exports = class Server {
    constructor(client) {
        this.client = client;
    }
    
    start() {
        app.get('/', (req, res) => {
        
        res.send("Website Online")
    });
        app.get('/api', (req, res) => {
           res.send({ guilds: this.client.guilds.cache.size, users: this.client.users.cache.size, commands: this.client.commands.size }) 
        });
    app.get('/api/guilds', (req, res) => {
        res.send({ guilds: this.client.guilds.cache.size })
    });
app.get('/api/users', (req, res) => {
    
    res.send({ users: this.client.users.cache.size })
})
app.get('/api/commands', jsonParser, (req, res) => {
    
    res.send({ commands: this.client.commands.size })
})
    app.listen(port, () => {
        console.log('Listening on port ' + port)
    })
    }
}
   
