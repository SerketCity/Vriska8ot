const { SlashCommandBuilder } = require('discord.js')
const { Users } = require('../dbObjects.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mine')
        .setDescription('Mines from a grist vein.'),
    async execute(interaction) {
        let yield = Math.floor(Math.random() * 20 + 1)
        if(yield == Math.floor(Math.random() * 20 + 1)) {
            yield *= 2
            await interaction.reply(`${interaction.user.username} mines ${yield} grist from a potent vein. Nice!!!!!!!!`)
        } else {
            await interaction.reply(`${interaction.user.username} mines ${yield} grist.`)
        }

        await Users.findOne({
            where: {
                user_id: interaction.user.id
            }
        }).then(function(result) {
            if(!result) {
                Users.create({ user_id: interaction.user.id, grist: yield})
            } else {
                Users.increment(
                    { grist: +yield }, 
                    {where: { user_id: interaction.user.id }
                })
            }
        })
    }
}