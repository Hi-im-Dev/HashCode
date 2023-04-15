const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userInputs = {};
let parseIndex = 1;
let currentCase = 1;

rl.on("line", (input) => {
  userInputs[parseIndex] = input;
  parseIndex++;
});

const getResult = (startIndex) => {
  const checkLight = (current) => {
    const streetlight = streetLightsArr[current];
    if (!streetlight) return -1;
    const previous = streetLightsArr[current - 1];
    // we're at first light, check distance
    if (!previous) {
      if (streetlight.position - lightbulb <= 0) {
        let result = checkLight(current + 1);
        return result !== -1 ? result : current;
      } else return -1;
    }
    // We get the previous light that was on, to calculate distances
    const previousThatWasOn = (() => {
      const reversedArr = streetLightsArr.slice(0, current).reverse();
      const lastIndex = reversedArr.findIndex((light) => light.on);
      return lastIndex !== -1 ? reversedArr[lastIndex] : undefined;
    })();

    // If it does not exist, check that this one reaches start of freeway
    if (!previousThatWasOn) {
      if (streetlight.position - lightbulb <= 0) {
        let result = checkLight(current + 1);
        return result !== -1 ? result : current;
      } else return -1;
    }

    const maxPrevious = previousThatWasOn.position + lightbulb;
    const minCurrent = streetlight.position - lightbulb;
    // Check that previous doesn't already reach end of freeway
    if (maxPrevious >= freeway) return -1;

    if (maxPrevious >= minCurrent) {
      let result = checkLight(current + 1);
      return result !== -1 ? result : current;
    }
    return -1;
  };

  const arr = userInputs[startIndex].split(" ");
  const freeway = parseInt(arr[0]);
  const lightbulb = parseInt(arr[1]);
  const streetLightsNb = parseInt(arr[2]);

  const streetLightsArr = Array(streetLightsNb)
    .fill()
    .map((_, i) => ({
      on: false,
      position: parseInt(userInputs[startIndex + 1].split(" ")[i]),
    }));

  let lightbulbNb = 0;
  // Start : we check the first streetlight
  let streetlightIndex = checkLight(0);
  while (streetlightIndex !== -1) {
    streetLightsArr[streetlightIndex].on = true;
    lightbulbNb++;
    streetlightIndex = checkLight(streetlightIndex + 1);
  }

  // We have to check that last one can light up
  const lastOn = (() => {
    const reversedArr = streetLightsArr.reverse();
    const lastIndex = reversedArr.findIndex((light) => light.on);
    return lastIndex !== -1 ? reversedArr[lastIndex] : null;
  })();
  if (lastOn) {
    if (lastOn.position + lightbulb < freeway) lightbulbNb = 0;
  }

  // End
  console.log(
    `Case #${currentCase}: ${lightbulbNb > 0 ? lightbulbNb : "IMPOSSIBLE"}`
  );
  return startIndex + 2;
};

rl.on("close", () => {
  const testCases = userInputs[1];
  let currentIdx = 2;
  for (let i = 0; i < Number(testCases); i++) {
    currentIdx = getResult(currentIdx);
    currentCase++;
  }
});
