import fs from "fs";

// Read the JSON file and parse it
const wordsImport = fs.readFileSync('new_counted_list.json', 'utf-8');
const wordsParsed = JSON.parse(wordsImport);

// Sets to store unique values for single and multi categories
const uniqueValuesSingle = new Set();
const uniqueValuesMulti = new Set();

// Iterate over the 'single' and 'multi' categories
Object.keys(wordsParsed).forEach(category => {
    // Iterate over the keys of the current category
    Object.keys(wordsParsed[category]).forEach(key => {
        // Add the key to the appropriate set based on the category
        if (category === 'single') {
            uniqueValuesSingle.add(key);
        } else if (category === 'multi') {
            uniqueValuesMulti.add(key);
        }
    });
});

// Convert the sets to arrays
const uniqueValuesArraySingle = Array.from(uniqueValuesSingle);
const uniqueValuesArrayMulti = Array.from(uniqueValuesMulti);

// Write the arrays of unique values to a JSON file
const jsonOutput = JSON.stringify({ single: uniqueValuesArraySingle, multi: uniqueValuesArrayMulti }, null, 2);
fs.writeFileSync('uniqueKeyValue.json', jsonOutput);

console.log('Unique key values saved to uniqueKeyValue.json');
