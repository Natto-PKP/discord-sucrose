module.exports = async ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);
 
  await sucrose.commands.define('avatar');
};
