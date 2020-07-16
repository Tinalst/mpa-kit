import './dashboad.scss'

import testJsonFile from '../../test/testJson.json'
import axios from 'axios'


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

  if(window.innerWidth >= 768 && window.innerWidth < 1024) {
    console.log('resize--->', 'ipad');
    import(/*webpackChunkName: 'dashboad-ipad'*/'./dashboad-ipad.scss')

  }else if(window.innerWidth >= 1024) {
    console.log('resize--->', 'desktop');
    import(/*webpackChunkName: 'dashboad-desktop'*/'./dashboad-desktop.scss')
  }
}
window.onload = resizeHandler();
window.addEventListener('resize', resizeHandler);
