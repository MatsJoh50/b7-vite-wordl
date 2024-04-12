export default function createWordlItem(word, guess){
    const rightWord = word.toUpperCase().split('');
    const guessingWord = guess.toUpperCase().split('');    
    const correct = []

    //cheat mode activate!!!!
// console.log('rightWord', rightWord)
// console.log('guess', guessingWord)

    for(let i = 0; i < rightWord.length; i++){
        if(rightWord[i] === guessingWord[i]){
            correct[i] = { letter: guessingWord[i], result: "Correct", color: "bg-green-500"}
            rightWord[i] = null
        } else {
            correct[i] = { letter: guessingWord[i], result: "Incorrect", color: "bg-red-500"  }
        }
    }


    for(let i = 0; i < rightWord.length; i++){
        if(correct[i].result.includes('Incorrect') && rightWord.includes(guessingWord[i])){
            correct[i] = { letter: correct[i].letter, result: 'Misplaced', color: "bg-yellow-500" }
            rightWord[rightWord.indexOf(guessingWord[i])] = null;
        }
    }
    return correct;
}
