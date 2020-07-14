import testJsonFile from '../../test/testJson.json'
import axios from 'axios'

import '../../style/global.css'
import '../../style/common.css'
import '../../style/component/component.css'
import '../../style/media/mobile.scss'
import styleDash from './dashboad.scss'


function whichModule() {
  console.log('whichModule------>', 'dashboad/index.js');
}
whichModule();

/**
 * ---------- json文件测试代码----------------
 */
console.log(testJsonFile);
// { name: 'json类型文件' }


/**
 * ---------- 支持代码分片，提取公共模块测试代码----------------
 */
console.log(axios.create());

/**
 * ---------- media query 测试代码----------------
 */
function resizeHandler() {
  console.log('resize--->');
  if(window.innerWidth >= 768 && window.innerWidth < 1024) {
    import(/*webpackChunkName: 'dashboad-ipad'*/'../../style/media/ipad.scss')
  }else if(window.innerWidth >= 1024) {
    import(/*webpackChunkName: 'dashboad-desktop'*/'../../style/media/desktop.scss')
  }
}
window.addEventListener('resize', resizeHandler);


console.log(styleDash);
/**
 * ----------css 模块化 测试代码----------------
 */
document.write(`<h1 class="${styleDash.cssModuleTest}">css 模块化测试</h1>`);
