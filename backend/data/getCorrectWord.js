import fs from "fs";


export default function getCorrectWord(bool, length) {
  // Read the JSON file
  // const data = fs.readFileSync("./backend/data/words.json", "utf-8");
  const data = fs.readFileSync("./data/words.json", "utf-8");

  // Parse JSON data
  const sortedWords = JSON.parse(data);

  // Determine whether to choose from 'single' or 'multi'
  const choise = bool; // Change to false to choose from 'multi'
  const lengthOfWord = length;

  // Choose a random word from the specified category and length
  let randomWord = "";

  if (bool == 'true') {
    const singleWords = sortedWords.single[lengthOfWord];
    if (singleWords && singleWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * singleWords.length);
      randomWord = singleWords[randomIndex];
      console.log('single')
    }
  } else {
    const multiWords = sortedWords.multi[lengthOfWord];
    if (multiWords && multiWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * multiWords.length);
      randomWord = multiWords[randomIndex];
      console.log('multi')
    }

  }
  console.log(randomWord)
  return randomWord;
}
