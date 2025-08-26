import { Schema, model } from "mongoose";


const EweekHistroy = new Schema({
    eventName: String,
    eventId: String,
    winners: String,
    firstRunnerUp: String,
    secondRunnerUp: String,
    thirdRunnerUp: String,
    Startdate: Date,
    Enddate: Date,
    status: String,
    category:[
        {gameschampion:[String],
        AthleticChampion:[String],
        skillstormChampion:[String]
        }
    ],
    events: [{
        title: String,
        date: Date,
        time: String,
        location: String,
        winners: String,
        firstRunnerUp: String,
        secondRunnerUp: String,
        thirdRunnerUp: String,
    }],
    totalParticipants: Number,
    totalTeams: Number,
    totalEvents: Number,
    totalPoints: Number,
    winnerTotalPoints: Number,
    firstRunnerUpTotalPoints: Number,
    secondRunnerUpTotalPoints: Number,
    thirdRunnerUpTotalPoints: Number,
    description: String,
    Highlights: String,
    memmorableMoments: [String],
    feedback: String,
    sponsors:[String]



})
export default model("EweekHistroy", EweekHistroy);