import * as crypto from 'crypto';
export const createProductCode = (productName) => {
  // get the first 8 char hash function
  const hash = makeHash(productName);
  // join both code and the hash
  const code = makeId(productName);
  // return the generated product code
  return hash + '-' + code;
};

// simple 8 char hash making
const makeHash = (string) => {
  return crypto.createHash('sha256').update(string).digest('hex').slice(0, 8);
};

const makeId = (text) => {
  let subStrings = ['']; // we will store the substrings here
  let finalText = text.toLowerCase().replace(/ /g, ''); // we will match the chars using the characters of each

  let temp = ''; // temp var of text matching

  for (let i = 0; i < finalText.length; i++) {
    if (i === 0) {
      temp = finalText[i];
    } else {
      if (finalText[i] > finalText[i - 1]) {
        temp += finalText[i];
      } else {
        temp = finalText[i];
      }

      if (temp.length > subStrings[0].length) {
        subStrings = [temp];
      } else if (temp.length == subStrings[0].length) {
        subStrings.push(temp);
      }
    }
  }

  // getting the index of the first character
  const firstChar = finalText.indexOf(subStrings[0]);

  // getting the index of the last character
  const lastChar =
    finalText.indexOf(subStrings[subStrings.length - 1]) +
    subStrings[0].length -
    1;

  return firstChar + subStrings.join('') + lastChar;
};
