const { ShardingManager } = require('discord.js');

// Create your ShardingManger instance
const manager = new ShardingManager('./bot.js', {
    token: process.env.TOKEN,
    totalShards: 'auto'
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Launched shard ${shard.id}`));

// Spawn your shards
manager.spawn();