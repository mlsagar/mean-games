const express = require("express");
const { allGames, addGame, oneGame, fullUpdateGame, partialUpdateGame, removeGame } = require("../controller/games.controller");
const { partialUpdateOne, getOne } = require("../controller/publisher.controller");

const router = express.Router();

router.route(process.env.URL_GAMES)
    .get(allGames)
    .post(addGame)

router.route("/games/:gameId")
    .get(oneGame)
    .put(fullUpdateGame)
    .patch(partialUpdateGame)
    .delete(removeGame)


router.route("/games/:gameId/publisher")
    .get(getOne)
    .patch(partialUpdateOne);

router.route("/games/:gameId/reviews")
    .get(allReviews)
    

module.exports = router;