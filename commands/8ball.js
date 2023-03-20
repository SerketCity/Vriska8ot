const { SlashCommandBuilder } = require('discord.js')

const responses = ['It is certain.', 'It is decidedly so.', 'Without a dou8t.', 'Yes definitely.', 'You may rely on it.', 
                    'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 
                   'Reply hazy, try again.', 'Ask again l8r.', '8etter not tell you now.', 'Cannot predict now.', 'Concentr8 and ask again.',
                    'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very dou8tful.'] 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask Vriska a question for a typical Magic 8 Ball response.')
        .addStringOption(option =>
            option
                .setName('question')
                .setDescription('The question you would like to ask.')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply()
        await new Promise(resolve => setTimeout(resolve, 5000))
        await interaction.editReply({
            content: responses[Math.floor(Math.random() * 20)]
        })
    }
}