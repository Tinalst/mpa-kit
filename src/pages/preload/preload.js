/*
import '../../component/Form.js'
❎addForm();
*/

/*
import {addForm} from "../../component/Form";
✅addForm();
 */

import (
  /* webpackChunkName:  'form' */
  "../../component/Form.js").then(({addForm}) =>  registerHandle(addForm));



// import (/* webpackChunkName: 'form'，webpackPreload */ '../../component/Form.js').then(({addForm}) => {
// import (
//   /* webpackChunkName: 'form' */
//   /* webpackPrefetch: true */
//   '../../component/Form.js').then(({addForm}) => {
//   registerHandle(addForm)
// });
//
function registerHandle(event) {
  const form = document.querySelector('#form');
  form.onclick = event
}


// import (/* webpackPrefetch: true, webpackChunkName: 'table'*/ '../../component/Table.js');
// import(/* webpackPreoad: true, webpackChunkName: 'chart' */ '../../component/Chart.js');
// setTimeout(() => {
//   import(/* webpackPreoad: true, webpackChunkName: 'chart' */ '../../component/Chart.js');
// }, 3000);


// window.onload = function () {
//   const btn = document.querySelector('#btn');
//   btn.addEventListener('click', () => {
//     window.location.href = './prefetched.html'
//   });
//
//   const form = document.querySelector('#form');
//   form.addEventListener('click', () => {
//     /*
//       import ('../../component/Form.js');
//       ❎addForm(); // 无效
//      */
//
//     /*
//       import ('../../component/Form.js').then(() => {
//          ❎addForm(); // 无效
//       });
//      */
//
//     /*
//       import {addForm} from "../../component/Form.js";
//        ❎addForm();
//      */
//
//     /*
//       import('../../component/Form.js');
//       ❎ addForm() // 无效
//      */
//
//
//    // import (/* webpackChunkName: 'form' */ '../../component/Form.js').then(({addForm}) => {
//    //    ✅ addForm();
//    //  })
//   })
// };
