const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const prefix = ("!");

bot.on('ready', function() {
    console.log("Connexion à " + bot.user.username + " - #" + bot.user.id + " [REUSSITE]");
    bot.user.setActivity("Greed Island").catch(console.error);
});

bot.on('guildMemberAdd', member => {
    member.guild.channels.cache.find(channel => channel.id === "748331910643712100").send("**" + member.displayName + "** vient d'attérrir sur notre serveur! Nous sommes désormais **" + member.guild.memberCount + "**!");
    member.roles.add("748325862075662476").then(mbr => {
        console.log(member.displayName + " - Rôle attribué [REUSSITE]")
    }).catch(() => {
        console.log(member.displayName + " - Rôle attribué [ECHEC]");
    });
});

bot.on('guildMemberRemove', member => {
    member.guild.channels.cache.find(channel => channel.id === "748331910643712100").sebd("**" + member.displayName + "** vient de décoller et retourne sur la lune! Nous sommes désormais **" + member.guild.memberCount + "** survivants!");
})

bot.on('message', msg => {
    if(!msg.author.bot && msg.channel.type !== "dm") {
        if(msg.content === prefix + "site") {
          msg.reply("voici le lien: __*https://www.emmanuel-kasomo.yo.fr*__");
        }

        if(msg.content === prefix + "pp") {
          msg.channel.send(msg.author.displayAvatarURL());
        }
    }
});

bot.login(token);
