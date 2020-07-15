
import scopStyle from './setting-scop.css'
import setting from './setting.scss'

console.log(setting);
console.log(scopStyle);

function whichModule() {
  console.log('whichModule------>', 'setting/index.js');
}
whichModule();


const html = `<div class="${setting.test3}">全局样式导入测试</div>`;
document.write(html);
