require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'show-menu',
    description: 'Display a select menu with 4 options',
    options: [
      {
        name: 'option-1',
        description: 'choices',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'option-2',
        description: 'choices',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'option-3',
        description: 'choices',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'option-4',
        description: 'choices',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'time',
        description: 'time in seconds',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ]
  },
  {
    name: 'friendly',
    description: 'ping users with friendly tag',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands')
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )
    console.log("Slash commands registered")
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();