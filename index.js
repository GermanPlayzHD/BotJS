const {Client,RichEmbed} = require('discord.js');

const bot = new Client();

const token = 'Njc0MjE2NTc4MTYxNzA0OTcx.XxL2_Q.MJ5aaZv8u0NQvVfhlZOtXU0ev-8';

const PREFIX = '!';

const cheerio = require('cheerio');

const request = require('request');

const ping = require('minecraft-server-util');

const ms = require('ms');

const ytdl = require("ytdl-core");

var servers = {};


bot.on('ready', () =>{
    console.log('Der Bot ist bereit!');
})


bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'ping':
            message.channel.sendMessage('pong!');
            break;
        case 'private':
            const Embed = new RichEmbed()
            .setTitle("Test")
            .setColor(0xFF0000)
            .setDescription("Test-Privatnachricht");
     
                message.author.send(Embed);
            break;
        case 'randomimg':
            image(message);
            break;
        case 'youtube':
            message.channel.sendMessage('https://www.youtube.com/channel/UC5i0Il_UMHPWvpnwCxYoeSA?view_as=subscriber')
            break;
        case "umfrage": 

            if (!args[1]){
                message.channel.send(Embed);
            }

            let msgArgs = args.slice(1).join(" ");

            message.channel.send(msgArgs).then(messageReaction => {
                messageReaction.react("✅");
                messageReaction.react("❌");
            });

            break;
        case 'fabi':
            message.channel.sendMessage('YouTube : https://www.youtube.com/channel/UC6NFb6n5utbc7TA3kLXQ7qg \n Twitch : https://www.twitch.tv/lordfabihd')
            break;
        case 'noah':
            message.channel.sendMessage('YouTube : https://www.youtube.com/channel/UCOxIfyEgil-yQA-m1zoa-WA')
            break;
        case 'mc':
 
                if(!args[1]) return message.channel.send('Du musst eine gültige Minecraft Server IP/Domain eingeben')
                if(!args[2]) return message.channel.send('Du musst einen gültigen Port eingeben')
         
                ping(args[1], parseInt(args[2]), (error, reponse) =>{
                    if(error) throw error
                    const Embed = new RichEmbed()
                    .setTitle('Server Status')
                    .addField('Server IP', reponse.host)
                    .addField('Version', reponse.version)
                    .addField('Spieler Online', reponse.onlinePlayers)
                    .addField('Slots', reponse.maxPlayers)
                       
                    message.channel.send(Embed)

                })
            break;
        case 'damian':
            message.channel.sendMessage('Twitch : https://www.twitch.tv/mrfatilz')
            break;
        case 'buynpass':
            message.channel.sendMessage('You cant buy the N-Pass you stupid ass dumb ass retarded b*tch')
            break;
        case 'badtime':
            message.channel.sendMessage('You gonna have a good time :D')
            break;
        case 'sheeshkebap':
            message.channel.sendMessage('DÖNER SCHARFE SOOOSE')
            break;
        case 'callforhelp':
            message.channel.sendMessage('You called for help... But nobody came...')
            break;
        case 'realspeed':
            message.channel.sendMessage('You wanna see some real speeed?Maybe next time ^^')
            break;
        case 'nword':
            message.channel.sendMessage('You dont have the N-Word Pass to use this command')
            break;
        case 'commands':
            message.channel.sendMessage('(Prefix=! or /) \n 1.play [YouTube-URL] : Spielt ein Video als sound ab. \n 2.stop : Stoppt das YouTube-Video \n 3.skip : Überspringt das Video \n 4.ping : Antwortet mit "pong!" \n 5.youtube : Schickt den YouTube Kanal des Entwicklers \n 6.fabi oder noah : Schickt den YouTube Kanal von bestimmten Freunden \n 7.kate : Teste es aus xd \n 8.buynpass : Einfach beleidigungen xd \n ------------------------------------------------------------------- \n Ab hier musst du die commands testen um zu wissen was die machen xD \n ------------------------------------------------------------------- \n 9.badtime \n 10.sheeshkebap \n 11.call \n 12.realspeed \n 13.nword \n 14.barcode \n 15.ficken \n 16.callmygirlfriend \n 17.callmydad')
            break;
        case 'barcode':
            message.channel.sendMessage('IIIIIIIIIIIII')
            break;
        case 'porn':
            message.channel.sendMessage('http://www.dumpaday.com/wp-content/uploads/2017/02/the-random-pictures-31.jpg')
            break;
        case 'alabama':
            message.channel.sendMessage('Sweeet hoome ALABAMAAA')
            break;
        case 'callmygirlfriend':
        message.channel.sendMessage('Which one?')
            break;
        case 'callmydad':
            message.channel.sendMessage('Which one?')
            break;
        case 'version':
            message.channel.sendMessage('v1.5.5')
            break;
        case 'flex':
            message.react('💸')
            message.react('💰')
            message.react('🤑')
            break;
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("Ich kann den User nicht finden" + person)
    
            let mainrole = message.guild.roles.find(role => role.name === "@everyone");
            let role = message.guild.roles.find(role => role.name === "Gemuted");
            
     
            if(!role) return message.reply("Die mute Rolle wurde nicht gefunden")
    
    
            let time = args[2];
            if(!time){
                return message.reply("Du hast keine Zeitangabe angegeben!");
            }
    
            person.removeRole(mainrole.id);
            person.addRole(role.id);
    
    
            message.channel.send(`@${person.user.tag} wurde für ${ms(ms(time))} gemuted!`)
    
            setTimeout(function(){
                   
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} wurde entmuted`)
            }, ms(time));
    
    
    
            break;
        case 'play':
            

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });

            
            }

            if(!args[1]){
                message.channel.send("Du musst einen gültigen link eingeben!");
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.send("Du musst in einem Channel sein um mit dem Bot Musik hören zu können!");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];
            

            server.queue.push(args[1]);


            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            })


            server.queue.push(args[1]);







        break;

        case 'skip':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("Das Lied wurde übersprungen!")
        break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection){
                for(var i = server.queue.length -1; i >=0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                message.channel.send("Warteschleife wurde beendet und der channel wurde verlassen!")
                console.log('Warteschleife wurde gestoppt!')
            }

            if(message.guild.connection) message.guild.voiceConnection.disconnect();
        break;

        }

    }
);

function image(message){
    
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "random",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 

        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
 
 
 
 
 
 
}
 
bot.login(process.env.BOT_TOKEN);
