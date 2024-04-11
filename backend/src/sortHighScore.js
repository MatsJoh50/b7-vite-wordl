import mongoose from "mongoose";

const hsSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  dupe: Boolean,
  value: Number,
  endTime: Date,
  guesses: Number,
})

const scoreModel = mongoose.model("scores", hsSchema);

export default async function sortList(inputType, inputValue) {
  const userData = (await scoreModel.find({dupe: inputType, value:inputValue}).exec()).map((score) =>
    score.toObject()
);
const sortedHighScore = userData.sort((a, b) => b.score - a.score).slice(0, 10);
return sortedHighScore;
}
