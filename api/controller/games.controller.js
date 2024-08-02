const { Http2ServerResponse } = require("http2");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);


const allGames = function (request, response) {
    let offset = parseInt(process.env.INITIAL_FIND_OFFSET, process.env.RADIX_VALUE);
    let count = parseInt(process.env.INITIAL_FINAL_COUNT, process.env.RADIX_VALUE);
    const maxLimit = parseInt(process.env.MAX_FIND_COUNT, process.env.RADIX_VALUE);

    if (request.query && request.query.offset) {
        offset = parseInt(process.env.INITIAL_FIND_OFFSET, process.env.RADIX_VALUE)
    }

    if (request.query && request.query.count) {
        count = parseInt(process.env.INITIAL_FINAL_COUNT, process.env.RADIX_VALUE)
    }

    if (isNaN(offset) || isNaN(count)) {
        response.status(401).json({ message: "Invalid count or offset value" });
        return;
    }

    if (count > maxLimit) {
        response.status(401).json({ message: "Count should be less or equal to 10" });
        return;
    }

    const responseCollection = _generateResponseCollection();

    Game.find().skip(offset).limit(count).exec().then(function (games) {
        if (!games) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Games not found" }
            return;
        }

        responseCollection.status = 200;
        responseCollection.message = games;
    }).catch(function (error) {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(function () {
        _sendRequest(response, responseCollection);
    })


}

const addGame = function (request, response) {
    const responseCollection = _generateResponseCollection();
    const newGame = {
        title: request.body.title,
        year: request.body.year,
        rate: request.body.rate,
        price: request.body.price,
        minPlayers: request.body.minPlayers,
        maxPlayers: request.body.maxPlayers,
        publisher: { name: "No Name" },
        reviews: [],
        minAge: request.body.minAge,
        designers: [request.body.designers]
    }

    Game.create(newGame).then(function (res) {
        console.log(res);
        responseCollection.status = 200;
        responseCollection.message = { message: "Game Added Successfully" }
    }, function (error) {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(function () {
        _sendRequest(response, responseCollection);
    })
}

const oneGame = function (request, response) {
    const gameId = request.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        response.status(401).json({ message: "Invalid Game ID" });
        return;
    }
    const responseCollection = _generateResponseCollection();

    Game.findById(gameId).exec().then(function (game) {
        if (!game) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Game not found" }
            return;
        }

        responseCollection.status = 200;
        responseCollection.message = game;
    }).catch(function (error) {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(function () {
        _sendRequest(response, responseCollection);
    })
}

const fullUpdateGame = function (request, response) {
    const gameId = request.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        response.status(401).json({ message: "Invalid Game ID" });
        return;
    }
    const responseCollection = _generateResponseCollection();

    Game.findById(gameId).then(function (game) {
        if (!game) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Game not found" }
            return;
        }

        game.title = request.body.title;
        game.year = request.body.year;
        game.rate = request.body.rate;
        game.price = request.body.price;
        game.minPlayers = request.body.minPlayers;
        game.maxPlayers = request.body.maxPlayers;
        game.publisher = request.body.publisher
        game.reviews = request.body.reviews;
        game.minAge = request.body.minAge;
        game.designers = request.body.designers;

        return game.save()

    }).then(function (savedGame) {
        if (savedGame) {
            responseCollection.status = 200;
            responseCollection.message = { message: "Game fully updated" }
        }
    }).catch(function (error) {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(function () {
        _sendRequest(response, responseCollection);
    })

}
const partialUpdateGame = function (request, response) {
    const gameId = request.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        response.status(401).json({ message: "Invalid Game ID" });
        return;
    }
    const responseCollection = _generateResponseCollection();

    Game.findById(gameId).then(function (game) {
        if (!game) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Game not found" }
            return;
        }

        if (request.body && request.body.title) { game.title = request.body.title };
        if (request.body && request.body.year) { game.year = request.body.year };
        if (request.body && request.body.rate) { game.rate = request.body.rate };
        if (request.body && request.body.price) { game.price = request.body.price };
        if (request.body && request.body.minPlayers) { game.minPlayers = request.body.minPlayers };
        if (request.body && request.body.maxPlayers) { game.maxPlayers = request.body.maxPlayers };
        if (request.body && request.body.publisher) { game.publisher = request.body.publisher };
        if (request.body && request.body.reviews) { game.reviews = request.body.reviews };
        if (request.body && request.body.minAge) { game.minAge = request.body.minAge };
        if (request.body && request.body.designers) { game.designers = request.body.designers };

        return game.save()

    }).then(function (savedGame) {
        if (savedGame) {
            responseCollection.status = 200;
            responseCollection.message = { message: "Game Partially updated" }
        }
    }).catch(function (error) {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(function () {
        _sendRequest(response, responseCollection);
    })
}
const removeGame = function (request, response) {
    const gameId = request.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        response.status(401).json({ message: "Invalid Game ID" });
        return;
    }
    const responseCollection = _generateResponseCollection();

    Game.findByIdAndDelete(gameId).then(function (response) {
        if (!response) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Game Id not found" }
            return;
        }

        responseCollection.status = 200;
        responseCollection.message = { message: "Game Deleted Successfully" }
    }).catch(function (error) {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(function () {
        _sendRequest(response, responseCollection);
    })
}


const _sendRequest = function (response, responseCollection) {
    return response.status(responseCollection.status).json(responseCollection.message);
}

const _generateResponseCollection = function () {
    return {
        status: 201,
        message: ""
    }
}

module.exports = {
    allGames,
    addGame,
    oneGame,
    fullUpdateGame,
    partialUpdateGame,
    removeGame
}