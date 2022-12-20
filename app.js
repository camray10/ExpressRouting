const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/all', (req, res) => {

 if (!req.query.numbers) {
    res.status(400).send('Numbers are required!');
    return;
  }

  // split the numbers string into an array and convert each element to a number
  let numbers = req.query.numbers.split(',').map(Number);

  // check if any of the elements are not a number
  const invalidNumbers = numbers.filter(isNaN);
  if (invalidNumbers.length > 0) {
    res.status(400).send(`${invalidNumbers.join(', ')} is not a number`);
    return;
  }
  
  // calculate the mean
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

  // calculate the median
  numbers.sort((a, b) => a - b);
  const midpoint = Math.floor(numbers.length / 2);
  const median = numbers.length % 2 !== 0 ? numbers[midpoint] : (numbers[midpoint - 1] + numbers[midpoint]) / 2;

  // calculate the mode
  const modeMap = {};
  let maxCount = 0;
  let mode;
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (!modeMap[num]) modeMap[num] = 0;
    modeMap[num]++;
    if (modeMap[num] > maxCount) {
      maxCount = modeMap[num];
      mode = num;
    }
  }

  // return the results
  res.json({
    mean,
    median,
    mode
  });
});
