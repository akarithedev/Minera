const fetch = require('node-fetch');

const moment = require('moment');

const { MessageEmbed }  = require ("discord.js")

module.exports = {

        name: "npm",

        usage: `npm <Package>`,

        category: "information",

        description: "Sends information on an NPM package.",
    ownerOnly: false,
    run: async (client, message, args) => {

//code
if(!args.length) return message.channel.send('Please provide an NPM Package');
        
  const pkg = encodeURIComponent(args.join(' ').replace(/ +/g, '-'));

        try {

            const response = await fetch(`https://registry.npmjs.com/${pkg}`);

            const body = await response.json();

            if (response.status === 404 || body.time.unpublished) return message.channel.send('This package no longer exists.');

            const version = body.versions[body['dist-tags'].latest];

            const maintainers = client.utils.trimArray(body.maintainers.map(user => user.name));

            const dependencies = version.dependencies ? client.utils.trimArray(Object.keys(version.dependencies)) : null;
const embed = new MessageEmbed()
                .setColor(0xCB0000)

                .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')

                .setTitle(body.name)

                .setURL(`https://www.npmjs.com/package/${pkg}`)

                .setDescription(body.description || 'No description.')

                .addField('❯ Version', body['dist-tags'].latest, true)

                .addField('❯ License', body.license || 'None', true)

                .addField('❯ Author', body.author ? body.author.name : '???', true)

                .addField('❯ Creation Date', moment.utc(body.time.created).format('MM/DD/YYYY h:mm A'), true)

                .addField('❯ Modification Date', moment.utc(body.time.modified).format('MM/DD/YYYY h:mm A'), true)

                .addField('❯ Main File', version.main || 'index.js', true)

                .addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')

                .addField('❯ Maintainers', maintainers.join(', '))

           message.channel.send(embed)

        } catch (err) {

            if (err.status === 404) return message.channel.send('Could not find any results.');

            return message.channel.send(`An error occured while searching for this package`);

        }

    }

}

