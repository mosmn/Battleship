import {capitalize, reverseString, calclator, caesarCipher, analyzeArray} from './sum';

test('Capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
});

test('Reverses a string', () => {
    expect(reverseString('hello')).toBe('olleh');
});

test('Adds 1 + 2 to equal 3', () => {
    expect(calclator.add(1, 2)).toBe(3);
});

test('Subtracts 2 - 1 to equal 1', () => {
    expect(calclator.subtract(2, 1)).toBe(1);
});

test('Divides 4 / 2 to equal 2', () => {
    expect(calclator.divide(4, 2)).toBe(2);
});

test('Multiplies 2 * 2 to equal 4', () => {
    expect(calclator.multiply(2, 2)).toBe(4);
});

test('Ciphers "Hello, World!" with a shift of 3 to equal "Khoor, Zruog!"', () => {
    expect(caesarCipher('Hello, World!', 26)).toBe('Hello, World!');
});

test('Average, min, max and length of [1,8,3,4,2,6] to equal 4 1 8 6', () => {
    expect(analyzeArray([1,8,3,4,2,6])).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    });
});


