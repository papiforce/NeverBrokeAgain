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

    let msgToArray = msg.content.split(' ');
    let cmd = msgToArray[0];
    let args = msg.content.substring(msg.content.indexOf(' ')+1);

    if(!msg.content.startsWith(prefix)) {return}
    let cmdfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(cmdfile) {cmdfile.run(bot,msg,args)}

    if(cmd === `${prefix}pp`) {
        msg.channel.send(msg.author.displayAvatarURL());
    }
});

bot.login(token);
