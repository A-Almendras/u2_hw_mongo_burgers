// create 5 burgers (at least 3 should be beef)
db.burgers.insertMany([
  {
    protein: 'beef',
    cheese: true,
    toppings: ['ketchup', 'mustard', 'guacamole']
  },
  {
    protein: 'chicken',
    cheese: false,
    toppings: ['french fries', 'mango ', 'pickles']
  },
  {
    protein: 'turkey',
    cheese: true,
    toppings: ['mushrooms', 'tomatoes', 'pickled beets', 'mustard']
  },
  { protein: 'tofu', cheese: false, toppings: ['onion', 'relish', 'kimchi'] },
  {
    protein: 'elk',
    cheese: true,
    toppings: ['pickles', 'mayo', 'guacamole', 'tabasco']
  }
])

// find all the burgers
db.burgers.find()

// show just the meat of each burger
db.burgers.find({}, { protein: 1 })

// show just the toppings of each burger
db.burgers.find({}, { toppings: 1 })

// show everything but the cheese
db.burgers.find({}, { protein: 1, toppings: 1 })

// find all the burgers with beef
db.burgers.find({ protein: 'beef' })

// find all the burgers that are not beef
db.burgers.find({ protein: { $ne: 'beef' } })

// find the first burger with cheese
db.burgers.findOne({ cheese: true })

// find one and update the first burger with cheese to have a property of 'double cheese'
db.burgers.updateOne(
  { cheese: true },
  { $set: { slicesOfCheese: 'double' }, $currentDate: { lastModified: true } }
)

// find the burger you updated to have double cheese
db.burgers.find({ slicesOfCheese: 'double' })

// find and update all the beef burgers to be 'veggie'
db.burgers.updateMany(
  { protein: 'beef' },
  { $set: { protein: 'veggie' }, $currentDate: { lastModified: true } }
)

// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})
db.burgers.deleteOne({ protein: 'veggie' })

// drop the collection
//Expected Output
//true
db.burgers.drop()

// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }
db.dropDatabase()

//
// Bonus
//recreate your burgers database and your burger collection
//copy paste your insert burgers from above to reseed your database

// Change the name of the key cheese to 'pumpkinSpice'
db.burgers.updateMany({}, { $rename: { cheese: 'pumpkinSpice' } })

// find all the burgers with ketchup (or another topping you used at least once)
// using guacamole instead of ketchup
db.burgers.find({ toppings: 'guacamole' })

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles
// using mustard instead of pickles
db.burgers.updateMany({}, { $pull: { toppings: 'mustard' } })

// add a topping of 'eggs' to all the beef burgers
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact
db.burgers.updateMany({ protein: 'beef' }, { $push: { toppings: 'eggs' } })

//Add a price to each burger, start with $5.00 for each burger
db.burgers.updateMany({}, { $set: { price: '$5.00' } })
