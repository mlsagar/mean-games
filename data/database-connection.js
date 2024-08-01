const mongoose = require("mongoose");
require("./game-model");
const callbackify = require("util").callbackify;

mongoose.connect(process.env.DATABASE_URL);

handleConnected = function() {
    console.log("Mongoose connected to MongoDB");}

mongoose.connection.on("connected", handleConnected);

handleDisconnected = function() {
    console.log("Mongoose is disconnected");}

mongoose.connection.on("disconnected", handleConnected);

handleError = function(error) {
    console.log("Mongoose error: ", error);}

mongoose.connection.on("error", handleConnected);


const returnMongooseConnectionCloseMethod = function() {
    return mongoose.connection.close();
}

const mongooseConnectionCloseWithCallbackify = callbackify(returnMongooseConnectionCloseMethod);

const  handleConnectionInterruption= function(){
    console.log(process.env.SIGINT_MESSAGE);
    process.exit(0);
}
const handleSIGINT = function() {
    mongooseConnectionCloseWithCallbackify(handleConnectionInterruption);
}
process.on("SIGINT", handleSIGINT);


const handleConnectionTermination= function(){
    console.log(process.env.SIGTERM_MESSAGE);
    process.exit(0);
}
const handleSIGTERM = function() {
    mongooseConnectionCloseWithCallbackify(handleConnectionTermination);
}
process.on("SIGTERM", handleSIGTERM);


const handleConnectionRestart = function(){
    console.log(process.env.SIGUSR2_MESSAGE);
    process.kill(process.pid, "SIGUSR2");
}
const handleSIGUSR2 = function() {
    mongooseConnectionCloseWithCallbackify(handleConnectionRestart);
}
process.on("SIGUSR2", handleSIGUSR2);