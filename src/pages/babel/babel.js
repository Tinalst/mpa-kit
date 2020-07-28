/**
 * babel 只支持一些基础的特性
 */
const o1 = {a: 1};
const o2 = {
  ...o1,
  b: 2
};
console.log(o2);

/**
 * promise 需要引入垫片
 * @type {Promise<any>[]}
 */
const arr = [
  new Promise(() => console.log('1')),
  new Promise(() => console.log('2'))
];

arr.map(item => {
  document.write(item);
  console.log(item);
});

console.log(window.navigator.userAgent);

document.write(BigInt('12'));



