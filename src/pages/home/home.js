import axios from 'axios'

function whichModule() {
  console.log('whichModule------>', 'home/index.js');
}
whichModule();

/**
 * ---------- 支持代码分片，提取公共模块测试代码----------------
 */
console.log(axios.create());

