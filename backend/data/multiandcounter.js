import fs from 'fs';
import readline from 'readline';

// Create a readline interface
const rl = readline.createInterface({
  input: fs.createReadStream('words_alpha.txt'),
  crlfDelay: Infinity
});

// Array to store words
const words = [];

// Read the file line by line
rl.on('line', (line) => {
  words.push(line.trim());
});

// After reading all lines
rl.on('close', () => {
  // Function to categorize words and sort them
  function sortWords(words) {
    const single = [];
    const multi = [];
    
    words.forEach(word => {
      const charCounts = {};
      for (let char of word) {
        charCounts[char] = (charCounts[char] || 0) + 1;
      }
      const uniqueChars = Object.keys(charCounts).length;
      
      if (uniqueChars === word.length) {
        single.push(word);
      } else {
        multi.push(word);
      }
    });
    
    single.sort((a, b) => a.length - b.length);
    multi.sort((a, b) => a.length - b.length);
    
    return {
      single: single.reduce((acc, word) => {
        const length = word.length;
        acc[length] = acc[length] || [];
        acc[length].push(word);
        return acc;
      }, {}),
      multi: multi.reduce((acc, word) => {
        const length = word.length;
        acc[length] = acc[length] || [];
        acc[length].push(word);
        return acc;
      }, {})
    };
  }

  // Call the function with the words array
  const sortedWords = sortWords(words);

  // Write the sorted words to a new JSON file
  const newFilename = `new_counted_list.json`;
  fs.writeFile(newFilename, JSON.stringify(sortedWords, null, 2), (err) => {
    if (err) throw err;
    console.log(`Sorted words saved to ${newFilename}`);
  });
});
