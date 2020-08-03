import {default as i18next} from 'i18next'
import i18nextBrowserLngDetector from 'i18next-browser-languagedetector';
import i18nextFetchBackend from 'i18next-fetch-backend';
import i18nextIntervalPluralPostProcessor from 'i18next-intervalplural-postprocessor';

let NUM = '1';
let APPLE_COUNT = 1;
window.onload = init();

function init() {
  i18next
  .use(i18nextFetchBackend)
  .use(i18nextBrowserLngDetector)
  .use(i18nextIntervalPluralPostProcessor)
  .init({
    // 在所请求的语言不存在时的回退语言
    fallbackLng: 'en-US',
    // 语言
    lng: 'en-US',
    debug: true,
    // 命名空间：保持和文件名一致
    ns:['title', 'special'],
    // 如果指定了ns，必须指定一个默认显示的ns
    defaultNS: 'title',
    load: 'currentOnly',
    // supportedLngs: ['en-US', 'de'],
    backend: {
      // loadPath: 'http://192.168.20.138:9999/assets/locales/{{lng}}/{{ns}}.json'
      loadPath: `${window.location.origin}/assets/locales/{{lng}}/{{ns}}.json`
    }
  }, (error, t) => {
    console.log(error, t);
    updateChange();
  });

  document.querySelector('#de').addEventListener('click', changeLng.bind(this, 'de'));
  document.querySelector('#en').addEventListener('click', changeLng.bind(this, 'en-US'));
  document.querySelector('#sex').addEventListener('click', setSex);
  document.querySelector('#appleCount').addEventListener('click', setAppleCount)
}

function updateChange() {
  document.querySelector('#title').textContent = i18next.t('title', {what: 'ruru'});
  document.querySelector('#md').textContent = i18next.t('special:name');
  document.querySelector('#save').textContent = i18next.t('special:button.save');
  document.querySelector('#sex').textContent = i18next.t('special:sex');
  document.querySelector('#person').textContent = i18next.t('special:person', { who: 'tina', context: '1'});
  document.querySelector('#apple').textContent = i18next.t('special:apple', { count: 1});
  document.querySelector('#apples').textContent = i18next.t('special:apple', { count: 3});
  document.querySelector('#appleCount').textContent = i18next.t('special:button.apple');
  document.querySelector('#apple-interval').textContent = i18next.t('special:apple_interval', { postProcess: 'interval', count: 3})
}

function changeLng(lng) {
  i18next.changeLanguage(lng);
}

i18next.on('languageChanged', () => {
  // 必须在这个事件中进行变化
  updateChange();
});


function setSex() {
  NUM = NUM ==='1'? '0': '1';
  document.querySelector('#person').textContent = i18next.t('special:person', { who: 'tina', context: NUM})
}

function setAppleCount() {
  if(APPLE_COUNT === 1){
    APPLE_COUNT = 3;
  }else if(APPLE_COUNT === 3){
    APPLE_COUNT = 10;
  }else if(APPLE_COUNT === 10){
    APPLE_COUNT = 1
  }
  document.querySelector('#apple-interval').textContent = i18next.t('special:apple_interval', { postProcess: 'interval', count: APPLE_COUNT})
}
