const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const allReviews = function(request, response) {
    const gameId = request.params.gameId;

    if (!mongoose.isValidObjectId(gameId)) {
        response.status(401).json({message: "Invalid Game ID"});
        return;
    }

    const responseCollection = _generateResponseCollection();

    Game.findById(gameId).select("reviews").exec().then(function(reviewsData){
        if (!reviewsData) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Game ID not found" }
            return;
        }

        responseCollection.status = 200;
        responseCollection.message = reviewsData.reviews
    }).catch(function(error) {  
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(function() {
        _sendRequest(response, responseCollection);
    })
}

const oneReview = function(request, response) {
    const gameId = request.params.gameId;
    const reviewId = request.params.reviewId;

    if (!mongoose.isValidObjectId(gameId)) {
        response.status(401).json({message: "Invalid Game ID"});
        return;
    }

    if (!mongoose.isValidObjectId(reviewId)) {
        response.status(401).json({message: "Invalid Review ID"});
        return;
    }

    const responseCollection = _generateResponseCollection();

    Game.findById(gameId).select("reviews").exec().then(function(reviewsData){
        if (!reviewsData) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Game ID not found" }
            return;
        }

        const review = reviewsData.reviews.id(reviewId);

        if(!review) {
            responseCollection.status = 404;
            responseCollection.message = { message: "Review ID not found" }
            return;
        }

        responseCollection.status = 200;
        responseCollection.message = review
    }).catch(function(error) {  
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(function() {
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
    allReviews,
    oneReview
}

