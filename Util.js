const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

module.exports = class Util {
	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split('_').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}
	
	checkOwner(target) {
		return this.client.owners.includes(target);
	}

	comparePerms(member, target) {
		return member.roles.highest.position < target.roles.highest.position;
	}

	formatPerms(perm) {
		return perm
				.toLowerCase()
				.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
				.replace(/_/g, ' ')
				.replace(/Guild/g, 'Server')
				.replace(/Use Vad/g, 'Use Voice Acitvity');
	}

	formatArray(array, type = 'conjunction') {
		return new Intl.ListFormat('en-GB', { style: 'short', type: type }).format(array);
	}
    async getSongDuration(url) {
const fetch = require('node-fetch')
const token = this.client.manager.options.plugins[0].token
 const res = await fetch(url, {headers: {"Authorization": token}})
 const json = await res.json() 
const ms = json.duration_ms;
 const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      return `${hrs.padStart(1, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`

        }
    async haste(text) {
     const req = await this.client.snek.post("https://haste.ntmnathan.com/documents", { text });
     return `\`\`\`https://haste.ntmnathan.com/${req.data.key}\`\`\``   
   }
};