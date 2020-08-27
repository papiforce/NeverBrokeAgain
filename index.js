const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const prefix = ("!");

bot.on('ready', function() {
    console.log(bot.user.username + "#" + bot.user.id + " - Connexion [REUSSITE]");
    bot.user.setActivity("Greed Island").catch(console.error);
});

bot.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '748331910643712100');
    const welcomeMessage = welcomeChannel.send(`**${member}** vient d'attérrir sur notre serveur! Nous sommes **${member.guild.memberCount}** survivants désormais!`);
});

bot.on('guildMemberRemove', member => {
    const goodbyeChannel = member.guild.channels.cache.find(channel => channel.id === "748331910643712100");
    goodbyeChannel.send(`**${member}** vient de décoller et retourne sur la lune! Nous sommes **${member.guild.memberCount}** survivants désormais!`);
});

bot.on('messageReactionAdd', async (reaction, user) => {
  	if(reaction.partial) {
    		try {
    			   await reaction.fetch();
    		} catch (error) {
      			console.log('Something went wrong when fetching the message: ', error);
      			return;
    		}
  	}

    if(reaction.emoji.name === '✅' && reaction.message.id === '748500116846936095') {
        const role = reaction.message.guild.roles.cache.find(role => role.id === '748325862075662476');
        const member = reaction.message.guild.members.cache.get(user.id).roles.add('748325862075662476');
    }
});

bot.on('messageReactionRemove', async (reaction, user) => {
    if(reaction.partial) {
        try {
             await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
            return;
        }
    }

    if(reaction.message.id === '748500116846936095') {
        const role = reaction.message.guild.roles.cache.find(role => role.id === '748325862075662476');
        const member = reaction.message.guild.members.cache.get(user.id).roles.remove('748325862075662476');
    }
});

bot.on('message', async msg => {
    if(msg.author.bot || msg.channel.type === 'dm') {return}
    console.log(msg);

    if(msg.content === prefix + "pp") {
        msg.channel.send(msg.author.displayAvatarURL());
    }
});

bot.login(token);
