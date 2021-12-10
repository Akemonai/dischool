const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv')

dotenv.config();

const client = new Client(
    {
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ]
    }
);

var deadTrigger = 0;
var countTrigger = 0;
var isDead = true;

const random_num = () => {
    return Math.floor(Math.random() * 5) + 1;
}

client.on('ready', () => {
    console.log('The Bot is ready.')

    // const guildId = '918866184500310047'
    // const guild = client.guilds.cache.get(guildId)
    // let commands

    // if (guild) {
    //     commands = guild.commands
    // } else {
    //     commands = client.application?.commands
    // }

    // commands?.create({
    //     name: 'ping',
    //     description: 'Replies with pong.',
    // })
})

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isCommand()) {
//         return
//     }

//     const {commandName, options} = interaction

//     if (commandName === 'ping') {
//         interaction.reply({
//             content: 'pong',
//             ephemeral: true,
//         })
//     }

// })

client.on('messageCreate', msg => {
    if (msg.content == '>trigger') {
        countTrigger = countTrigger + 1;
        
        if (isDead) {
            msg.reply('No bullet left Bro. Try to /reload')
        } else if (countTrigger != deadTrigger) {
            msg.reply('You stay alive. This bullet is empty. ' + String(6 - countTrigger) + ' triggers left.')
        } else if (countTrigger == deadTrigger) {
            msg.reply('You are dead. This bullet is real.')
            isDead = true;
        }
    } else if (msg.content == '>reload') {
        deadTrigger = random_num()
        countTrigger = 0
        isDead = false;
        msg.reply('Gun has reloaded. 1 Bullets has filled and other (5) is empty.')
    }
})

client.login(process.env.TOKEN)