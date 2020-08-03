import i18next from 'i18next';

console.log(i18next);

window.onload = init();

function init() {
  i18next.init({
    // 是否开启调试模式，暴露问题
    debug: true,
    lng: 'en-US',
    // 载入资源
    resources:{
      'en-US': { // lng的值
        translation:{ // ns:{string | array} 命名空间 默认translation
          "key": "hello intl"
        }
      },
      'de': {
        translation:{
          "key": "hello welt"
        }
      }
    }
  }, function (error, t) {
    console.log(error, t);
    updateContent();
  });

  document.querySelector('#btn-en').addEventListener('click', () =>{
    changeLng('en-US')
  });
  document.querySelector('#btn-de').addEventListener('click',() => {
    changeLng('de')
  });
}

function updateContent() {
  document.querySelector('#output').textContent = i18next.t('key')
}

function changeLng(lng) {
  i18next.changeLanguage(lng);
  updateContent()
}
