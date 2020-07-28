// import $n from 'numeral'

//
// console.log($n);

const bigint = 34513483796377956799576892669647895858585858n;
const de = bigint.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
const ar = bigint.toLocaleString('ar-EG', {style: 'currency', currency: 'EUR'});
document.write(de + '\n' + ar);

// 补零
function zeroPadEnd(target,n) {
  _len = 0;
  while (n > _len) {
    target += '0';
    _len++
  }
  return target
}

console.log(zeroPadEnd(12.3, 3));
