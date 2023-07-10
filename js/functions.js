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
их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.

Здесь с помощью циклов у меня решить не получилось, поэтому я прочитала про регулярные выражения и решила с ними, правильно? */

const getNumber = (string) => {
  const regEx = /\d/g;
  if (regEx.test(string)) {
    const number = string.match(regEx);
    return +number.join('');
  }
  return NaN;
};

getNumber();

/* Решение без регулярного выражения. не работает - сравнивает только первый символ.
Можно ли как-то улучшить это решение, чтобы оно работало, или лучше по-другому? */

const extractNumber = (string) => {
  for (let i = 0; i <= string.length - 1; i++) {
    (string[i] <= 9) ? Number(string[i]) : NaN; // не поняла, что не нравится линтеру, а как нужно?
    const number = Number(string[i]);
    return number;
  }
};

extractNumber();

/* 3) Функция, которая принимает три параметра: исходную строку, минимальную длину
и строку с добавочными символами — и возвращает исходную строку, дополненную указанными
символами до заданной длины. Нельзя использовать padStart().

Эту задачу у меня не получилось решить до конца, проходит не все проверки. Не работает самое первое
условие задачи.
В ретро они использовали остаток от деления - %. Я тоже о нем думала, но сама не смогла догадаться,
как его правильно применить.
*/

const extendString = (string, length, extender) => {
  let newString;
  newString = extender.repeat(length - string.lenght) + string;
  // Если «добивка» слишком длинная, она обрезается с конца.
  if (extender.length >= length) {
    newString = extender.slice(string, length - string.length) + string;
  }
  // Если исходная строка превышает заданную длину, она не должна обрезаться
  if (string.length > length) {
    newString = string;
  }
  return newString;
};

extendString();

/* 4) Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

Эта функция у меня работает, но, например, при аргументах (6, 7, 10) выдает 7.743238831 - больше крайнего значения, это нормально? */

const getRandomNumber = (startNumber, lastNumber, quantitySymbols) => {
  if (startNumber >= 0 && lastNumber >= 0) {
    const randomNumber = Number((Math.random() * (lastNumber - startNumber + 1) + startNumber).toFixed(quantitySymbols));
    return randomNumber;
  }
  return NaN;
};

getRandomNumber();
