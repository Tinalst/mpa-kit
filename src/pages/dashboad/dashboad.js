import './dashboad.scss'

import testJsonFile from '../../test/testJson.json'
import axios from 'axios'

import picTree from '../../assets/images/tree.png';
import picRocket from '../../assets/images/rocket.svg';
import picSea from '../../assets/images/sea.jpg';

/**
 * ---------- js 图片资源测试代码----------------
 */
console.log(picTree);
console.log(picRocket);
console.log(picSea);
const imgTree = new Image();
imgTree.src = picTree;

const imgRocket0 = `<img src="${picSea}" style="width: 100px; height: 100px">`;
const imgRocket = `<img src="${picRocket}">`;
const imgRocket2 = `<img src="../../assets/public/tree.png">`;

document.write(imgRocket0);
document.write(imgRocket);
document.write(imgRocket2);


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
    import(/*webpackChunkName: 'a'*/'./dashboad-ipad.scss')

  }else if(window.innerWidth >= 1024) {
    console.log('resize--->', 'desktop');
    import(/*webpackChunkName: 'b'*/'./dashboad-desktop.scss')
  }
}
window.onload = resizeHandler();
window.addEventListener('resize', resizeHandler);
