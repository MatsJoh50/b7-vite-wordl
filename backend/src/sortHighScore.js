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

const scoreModel = mongoose.model("scores", hsSchema);


export default async function sortList(inputType, inputValue) {
  console.log(inputType, inputValue)
  const userData = (await scoreModel.find({ dupe: inputType, length: inputValue}).exec()).map((obj) => obj.toObject())
  const sortedHighScore = userData
    .sort((a, b) => b.score - a.score) // Sorting based on the value property
    .slice(0, 10); // Selecting top 10 scores

  sortedHighScore.forEach(element => {
    console.log('name:', element.score);
  });
  return sortedHighScore;
}