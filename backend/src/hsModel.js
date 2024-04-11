import mongoose from "mongoose";

const hsItem = mongoose.model('Scores', {
    name: String,
    startTime: Date,
    dupe: Boolean,
    value: Number,
    endTime: Date,
    guesses: Number,
});

export {hsItem}