require('dotenv').config()
const { Client, Intents, Constants } = require('discord.js')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('FLARP', { type: 'PLAYING' })

    const guildId = '219572263912079360'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if(guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong!'
    })

    commands?.create({
        name: '8ball',
        description: 'Gives a typical 8ball response.',
        options: [
            {
                name: 'question',
                description: 'The prompt for the 8ball response.',
                require: true,
                type: Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if(commandName === 'ping') {
        interaction.reply({
            content: 'Pong!'
        })
    } else if(commandName === '8ball') {
        const responses = ['It is certain.', 'It is decidedly so.', 'Without a dou8t.', 'Yes definitely.', 'You may rely on it.', 
                           'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 
                           'Reply hazy, try again.', 'Ask again l8r.', '8etter not tell you now.', 'Cannot predict now.', 'Concentr8 and ask again.',
                            'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very dou8tful.']
        await interaction.deferReply()
        await new Promise(resolve => setTimeout(resolve, 5000))

        interaction.editReply({
            content: responses[Math.floor(Math.random() * 20)]
        })
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)