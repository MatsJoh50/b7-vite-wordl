// hsSchema.js
import mongoose from "mongoose";

const hsSchema = new mongoose.Schema({
    name: String,
    sTime: Date,
    dupe: Boolean,
    length: Number,
    eTime: Date,
    guesses: Number,
    score: Number
});

const hsItem = mongoose.model('Scores', hsSchema);

export { hsItem, hsSchema };
