const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function alphabetIndex(letter) {
  return (letter.toUpperCase().charCodeAt(0) - 65) % 10;
}

const userInputs = {};
let currentIndex = 1;
let currentCase = 1;

rl.on("line", (input) => {
  userInputs[currentIndex] = input;
  currentIndex++;
});

const getResult = (startIndex) => {
  const map = userInputs[startIndex].replace(/\s/g, "");
  const wordNb = userInputs[startIndex + 1];
  let words = [];
  for (let j = 0; j < wordNb; j++) {
    words.push(userInputs[startIndex + 2 + j]);
  }
  words = words.map((word) => {
    let newWord = "";
    for (let wordIndex in word) {
      newWord += map[alphabetIndex(word[wordIndex])];
    }
    return newWord;
  });
  const uniqueWords = [...new Set(words)];
  console.log(
    `Case #${currentCase}: ${
      uniqueWords.length === words.length ? "NO" : "YES"
    }`
  );
  return startIndex + 2 + Number(wordNb);
};

rl.on("close", () => {
  const testCases = userInputs[1];
  let currentIdx = 2;
  for (let i = 0; i < Number(testCases); i++) {
    currentIdx = getResult(currentIdx);
    currentCase++;
  }
});
