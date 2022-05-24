const { Schema, model } = require("mongoose");

const drinkSchema = new Schema({
    name: {
        type: String,
        required: "Your drink needs a name",
        minlength: 1,
        trim: true
    },
    price: {
        type: Number,
        required: "Your drink can't be free",
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    image: {
        type: String,
        trim: true,
    }
});

const Drink = model("Drink", drinkSchema);

module.exports = Drink;