const { SlashCommandBuilder } = require('discord.js')
const { Users } = require('../dbObjects.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Check how much grist you have.'),
    async execute(interaction) {
        await Users.findOne({
            attributes: [
                'grist'
            ],
            where: {
                user_id: interaction.user.id
            }
        }).then(function(result) {
            interaction.reply(`${interaction.user.username} has ${result.grist} grist.`)
        })
    }
}