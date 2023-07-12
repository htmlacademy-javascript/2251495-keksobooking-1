/* 1) Функция для проверки, является ли строка палиндромом.

Я знаю, что задача на палиндром решается чаще всего с приведенеием строки к массиву, переворачиванием
его и склеиванием потом снова в строку. Но в этом разделе массивов ещё не было, и я попыталась решить без них.
*/

const isPalindrom = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');

  let reversedString = '';
  for (let i = string.length - 1; i >= 0 ; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
};

isPalindrom();

/* 2) Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает
их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.*/

const getNumber = (string) => {
  const regEx = /\d/g;
  if (regEx.test(string)) {
    const number = string.match(regEx);
    return +number.join('');
  }
  return NaN;
};

getNumber();

/* Решение без регулярного выражения. */

const extractNumber = (string) => {
  let result = '';
  for (let i = 0; i <= string.length; i++) {
    if (isNaN(string[i])) {
      continue;
    }
    result += string[i].replace(' ', '');
  }
  if (result === '') {
    return NaN;
  }
  return result;
};

extractNumber();

/* 3) Функция, которая принимает три параметра: исходную строку, минимальную длину
и строку с добавочными символами — и возвращает исходную строку, дополненную указанными
символами до заданной длины. Нельзя использовать padStart().
*/

const extendString = (string, length, extender) => {
  if (string.length >= length) {
    return string;
  }
  const extendLength = length - string.length;
  let newString = extender.repeat(extendLength) + string;
  if (newString.length > length) {
    newString = extender.slice(0, extendLength % extender.length) + extender.repeat(extendLength / extender.length) + string;
  }

  return newString;
};

extendString();

/* 4) Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. */


const getRandomNumber = (startNumber, lastNumber, quantitySymbols) => {
  if (startNumber >= 0 && lastNumber >= 0) {
    const randomNumber = Number((Math.random() * (lastNumber - startNumber) + startNumber).toFixed(quantitySymbols));
    return randomNumber;
  }
  return NaN;
};

getRandomNumber();
