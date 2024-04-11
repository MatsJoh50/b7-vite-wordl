import mongoose from "mongoose";

const hsSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  dupe: Boolean,
  value: Number,
  endTime: Date,
  guesses: Number,
});

const scoreModel = mongoose.model("scores", hsSchema);

// export default async function sortList(inputType, inputValue) {
//   const userData = await scoreModel.find({ dupe: inputType, value: inputValue }).exec();
//   const sortedHighScore = userData
//     .sort((a, b) => b.value - a.value) // Sorting based on the value property
//     .slice(0, 10); // Selecting top 10 scores

//   sortedHighScore.forEach(element => {
//     console.log('name:', element.name);
//   });
//   console.log('test sort list');
//   return sortedHighScore;
// }


export default async function sortList(inputType, inputValue) {
  console.log(inputType, inputValue)
  const userData = (await scoreModel.find({ dupe: inputType, value: inputValue}).exec()).map((obj) => obj.toObject())
  const sortedHighScore = userData
    .sort((a, b) => b.name - a.name) // Sorting based on the value property
    .slice(0, 10); // Selecting top 10 scores

  sortedHighScore.forEach(element => {
    console.log('name:', element.name);
  });
  return sortedHighScore;
}