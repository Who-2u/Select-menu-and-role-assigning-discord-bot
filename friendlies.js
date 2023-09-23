const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle } = require('discord.js');

//role id of friendlies role
const roleId = '1155036732450938970';

async function friendly({ interaction }) {
  const userId = interaction.user.id;

  const role = interaction.guild.roles.cache.get(roleId);


  const row = new ActionRowBuilder();

  row.components.push(
    new ButtonBuilder().setCustomId('play')
      .setLabel('Lets play!')
      .setStyle(ButtonStyle.Secondary)
  )
  row.components.push(
    new ButtonBuilder().setCustomId('toggle')
      .setLabel('Toggle notifications')
      .setStyle(ButtonStyle.Secondary)
  )

  interaction.reply({
    content: `<@${userId}> is looking for a friendly, is anyone up for a game ?\n${role}`,
    components: [row]

  })


};

async function friendlyButton({ interaction }) {
  if (interaction.customId === 'play') {
    const mentionString = interaction.message.content;
    const userId = mentionString.match(/\d+/)[0];

    if (userId === interaction.user.id) {
      await interaction.reply({ content: `Hey <@${userId}>, you can't play yourself. Please be patience`, ephemeral: true });
      return;
    }


    await interaction.reply(`Hey <@${userId}> - <@${interaction.user.id}> dares to accept your challenge!`);

  }

  if (interaction.customId === 'toggle') {

    const role = interaction.guild.roles.cache.get(roleId);
    const hasRole = interaction.member.roles.cache.has(roleId);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.reply({ content: `The role ${role} has been removed`, ephemeral: true });
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.reply({ content: `The role ${role} has been added`, ephemeral: true });
  }




};


module.exports = { friendly, friendlyButton };