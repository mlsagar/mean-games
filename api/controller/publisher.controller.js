const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const callbackify = require("util").callbackify;

const _gameFindByIdSelectExecWithCallbackify = callbackify(function(gameId) {
    return Game.findById(gameId).select("publisher").exec();
})

const _gameSaveWithCallbackify = callbackify(function(game) {
    return game.save();
})

const partialUpdateOne = function (request, response) {
    const gameId = request.params.gameId;
    console.log(response.body);
    _gameFindByIdSelectExecWithCallbackify(gameId, function(error, game){
        if (request.body && request.body.name) {
            console.log("name");
            game.publisher.name = request.body.name;
        }
        if (request.body && request.body.location) {
            console.log("location");
            game.publisher.location = request.body.location;
        }
        if (request.body && request.body.country) {
            console.log("country");
            game.publisher.country = request.body.country;
        }
        if (request.body && request.body.established) {
            console.log("established");
            game.publisher.established = request.body.established;
        }
        game.markModified("publisher");
        console.log("Modified", game.publisher)
        _gameSaveWithCallbackify(game, function(error, updateGame){
            if (!error) {
                response.status(200).json({message: "Partial update successfully"});
            }
        })
    })
}

module.exports = {
    partialUpdateOne
}