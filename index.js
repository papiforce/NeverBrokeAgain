const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const prefix = ("!");

bot.on('ready', function() {
    console.log("Je suis prêt!");
    bot.user.setActivity("Greed Island").catch(console.error);
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send("Bienvenue sur le serveur " + member.displayName + "!");
        console.log(`${member.displayName} à rejoins le serveur.`);
    }).catch(console.error)
});

bot.on('message', msg => {
    if(msg.content === prefix + "site") {
      msg.channel.send("https://www.emmanuel-kasomo.yo.fr");
      console.log("Une personne a demandé le lien de ton site!");
    }
});

bot.login(token);
