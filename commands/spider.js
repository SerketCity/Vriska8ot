const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spider')
        .setDescription('Sends an extremely scary picture of a spider. You have been warned.'),
    async execute(interaction) {
        let files = fs.readdirSync("./assets")
        await interaction.reply({files: ["./assets/Vriska_Serket.png"]})
    }
}