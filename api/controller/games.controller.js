const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const callbackify = require("util").callbackify;

const allGames = function(request, response) {
    let offset = parseInt(process.env.INITIAL_FIND_OFFSET, process.env.RADIX_VALUE);
    let limit = parseInt(process.env.INITIAL_FIND_LIMIT, process.env.RADIX_VALUE);

}

const addGame = function(request, response) {
    
}

module.exports = {
    allGames,
    addGame
}