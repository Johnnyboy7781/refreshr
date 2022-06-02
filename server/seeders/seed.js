const db = require('../config/connection');
const { Drink, User } = require('../models');
const drinkSeeds = require('./drinkSeeds.json');

db.once('open', async () => {
  await Drink.deleteMany({});
  await Drink.create(drinkSeeds);

  console.log('all done!');
  process.exit(0);
});
