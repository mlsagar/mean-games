const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        coordinates: [Number, Number]
    },
    country: String,
    established: Number
})

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    review: {
        type: String,
        required: true
    },
    postDate: Date
})

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10,
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10,
    },   
    publisher: publisherSchema, 
    reviews: [reviewSchema],
    minAge: Number,
    designers: [String]
})

mongoose.model(process.env.GAME_MODEL, gameSchema, process.env.GAME_COLLECTION);
