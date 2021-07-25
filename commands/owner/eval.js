const { MessageEmbed } = require('discord.js')
const beautify = require('beautify')
const { inspect } = require('util')
module.exports = {
    name: "eval",
    category: "owner",
    usage: "eval <code>",
    aliases: ["evaluate"],
    description: "Evaluates a javascript code",
    ownerOnly: true,
    run: async(client, message, query, data) => {
        let msg = message;
const { args, flags } = parseQuery(query);
        
    try {
      if (!args.length) return msg.channel.send('Please provide something to eval') 
      let code = args.join(" ");
      let depth = 0;
      if (flags.includes("async")) {
        code = `(async() => { ${code} })()`;
      }
      if (flags.some(x => x.includes("depth"))) {
          depth = flags.find(x => x.includes("depth")).split("=")[1];
          depth = parseInt(depth, 10);
      }

      let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
        if (flags.includes("silent")) return;
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
        evaled = evaled
        .replace(client.token, 'kek')
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`);
        if (evaled.length >= 1024) evaled = await client.utils.haste(evaled);
        else evaled = `\`\`\`js\n${evaled}\`\`\``;
        const embed = new MessageEmbed()
          .setAuthor("Eval Command")
          .setColor("GREEN")
          .setDescription(`**Input**\n\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField('Output', evaled)
        await msg.channel.send(embed);
     
       } catch (e) {
       let error;
       if(e.length >= 1024) error = await client.utils.haste(e);
       else error = `\`\`\`${e}\`\`\``;
       const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor("ERROR")
        .setDescription(error)
       await msg.channel.send(embed);
    }

      async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}
    function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}
    }
}