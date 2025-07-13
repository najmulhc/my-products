import * as crypto from 'crypto'
export const createProductCode = (productName) => {

  // get the first 8 char hash function
  const hash = makeHash(productName);
  // join both code and the hash
  const code = makeId(productName)
  // return the generated product code
  return  hash+"-"+code;
};

const makeHash = string => {
  return crypto.createHash("sha256").update(string).digest("hex").slice(0, 8);
}

const makeId = string => {
  let char = [''];
  string = string.toLowerCase().replaceAll(' ', '');

  let temp = '';
  for (let i = 0; i < string.length; i++) {
    if (temp == '' || string[i] > string[i - 1]) {
      temp += string[i];
    } else {
      if (temp.length > char[0].length) {
        char = [temp];
      } else if (temp.length == char[0].length) {
        char.push(temp);
      } else if (temp.length < char[0].length) {
        temp = '';
      }
      temp = string[i];
    }
  }

  const  lastElem = char[char.length-1]
  const positions = {
    first: string.indexOf(char[0][0]),
    last: string.indexOf(
      lastElem[lastElem.length -1],
    ),
  };

  return positions.first.toString() + char.join('') + positions.last.toString();
}
