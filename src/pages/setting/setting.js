import scopStyle from './setting-scop.css'
import setting from './setting.scss'

console.log(scopStyle);

function whichModule() {
  console.log('whichModule------>', 'setting/index.js');
}
whichModule();


/**
 * 测试前部的样式文件，也能css in js
 * @type {string}
 */
const html = `<div class="${setting.test3}">test3 不在模块化样式文件中，但是设置了exportGlobal所以在JS能访问到</div>
<div class="${scopStyle.test1}">test1在模块化样式文件中,通过JS访问设置有效</div>`;
document.write(html);
