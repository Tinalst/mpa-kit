import testJsonFile from '../../test/testJson.json'
import axios from 'axios'

import '../../style/global.css'
import '../../style/common.css'
import '../../style/component/component.css'
import './dashboad.scss'

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
