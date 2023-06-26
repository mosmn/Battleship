function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reverseString(string) {
    return string.split('').reverse().join('');
}

let calclator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    divide: (a, b) => a / b,
    multiply: (a, b) => a * b
};

function increment(char) {
    let charCode = char.charCodeAt(0);
    if (charCode === 90) {
        return 'A';
    } else if (charCode === 122) {
        return 'a';
    } else {
        return String.fromCharCode(charCode + 1);
    }
}

function caesarCipher(string, shift) {
    let cipheredString = '';
    for (let i = 0; i < string.length; i++) {
        let char = string[i];
        if (char.match(/[a-z]/i)) {
            for (let j = 0; j < shift; j++) {
                char = increment(char);
            }
        }
        cipheredString += char;
    }
    return cipheredString;
}

function analyzeArray(array) {
  let average = array.reduce((a, b) => a + b) / array.length;
  let min = Math.min(...array);
  let max = Math.max(...array);
  let length = array.length;
  return {
    average: average,
    min: min,
    max: max,
    length: length
  };
}

export {capitalize, reverseString, calclator, caesarCipher, analyzeArray};