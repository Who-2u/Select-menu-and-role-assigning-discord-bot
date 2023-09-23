const { StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  ComponentType } = require('discord.js');

async function run({ interaction }) {

  const timeInSeconds = interaction.options.get('time').value * 1000;

  const menu = [
    {
      label: interaction.options.get('option-1').value,
      value: interaction.options.get('option-1').value,
    },
    {
      label: interaction.options.get('option-2').value,
      value: interaction.options.get('option-2').value,
    },
    {
      label: interaction.options.get('option-3').value,
      value: interaction.options.get('option-3').value,
    },
    {
      label: interaction.options.get('option-4').value,
      value: interaction.options.get('option-4').value,
    },
  ];

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder('Make a selection.....')
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions(
      menu.map((pet) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(pet.label)
          .setValue(pet.value)

      )
    );
  const actionRow = new ActionRowBuilder().setComponents(selectMenu);

  const reply = await interaction.reply({ components: [actionRow] });


  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    //set time for how long the collector should listen for interactions
    time: timeInSeconds,
  });

  setTimeout(async () => {
    const updatedActionRow = new ActionRowBuilder().addComponents(
      selectMenu
        .setPlaceholder('Event has ended')
        .setDisabled(true)
    );
    await reply.edit({ components: [updatedActionRow] });
  }, timeInSeconds);

  const selectedOptionsByUser = {};

  collector.on('collect', (interaction) => {

    // Store the id of user who interacts
    const userId = interaction.user.id;

    if (selectedOptionsByUser[userId]) {

      interaction.reply(`Hey <@${userId}>, you have already selected: **${selectedOptionsByUser[userId]}**`);

    }
    else {

      interaction.reply(`<@${userId}> have selected: ${interaction.values}`);

      // Store the selected option for the user
      selectedOptionsByUser[userId] = interaction.values[0];
    }

  });

};


module.exports = { run };