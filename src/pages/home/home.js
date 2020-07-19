import axios from 'axios'

function whichModule() {
  console.log('whichModule------>', 'home/index.js');
}
whichModule();

/**
 * ---------- 支持代码分片，提取公共模块测试代码----------------
 */
console.log(axios.create());


/**
 * ---------- media query 测试代码----------------
 */
// function resizeHandler() {
//   console.log('resize--->');
//   if(window.innerWidth >= 768 && window.innerWidth < 1024) {
//     import(/*webpackChunkName: 'home-ipad'*/'../../style/media/ipad.scss')
//   }else if(window.innerWidth >= 1024) {
//     import(/*webpackChunkName: 'home-desktop'*/'../../style/media/desktop.scss')
//   }
// }
// window.addEventListener('resize', resizeHandler);
