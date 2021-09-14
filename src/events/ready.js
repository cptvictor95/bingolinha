module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.info(`${client.user.tag} tá on!`);
  },
};
