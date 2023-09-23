const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const keepAlive = require('./server.js');
const { run } = require('./dropdown.js');
const { friendly, friendlyButton } = require('./friendlies.js');
require('dotenv/config')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('The bot is ready')
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand) return;
  try {
    if (interaction.commandName === 'show-menu') {


      run({ interaction });

    }
    if (interaction.commandName === 'friendly') {
      friendly({ interaction });

    }
    if (interaction.isButton()) {
      if (interaction.customId == 'play' || interaction.customId == 'toggle') {
        friendlyButton({ interaction });

      }

    }

  }
  catch (error) {
    console.log(error);
  }
});




client.login(process.env.TOKEN);


keepAlive();