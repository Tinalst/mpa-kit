module.exports = [
  {
    // JS模块
    moduelUrl: `../src/pages/babel/babel.js`,
    // 对应的HTML模板
    templateUrl: '../src/pages/babel/babel.html',
    // 是否开启prefetch
    isPrefetch: true,
    // 是否开启preload
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/dashboad/dashboad.js`,
    templateUrl: '../src/pages/dashboad/dashboad.html',
    isPrefetch: false,
    isPreload: true
  },
  {
    moduelUrl: `../src/pages/home/home.js`,
    templateUrl: '../src/pages/home/home.html',
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/prefetched/prefetched.js`,
    templateUrl: `../src/pages/prefetched/prefetched.html`,
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/preload/preload.js`,
    templateUrl: `../src/pages/preload/preload.html`,
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/setting/setting.js`,
    templateUrl: `../src/pages/setting/setting.html`,
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/split/split.js`,
    templateUrl: `../src/pages/split/split.html`,
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/cdn/cdn.js`,
    templateUrl: `../src/pages/cdn/cdn.html`,
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/intl/intl.js`,
    templateUrl: `../src/pages/intl/intl.html`,
    isPrefetch: false,
    isPreload: false
  },
  {
    moduelUrl: `../src/pages/intl-backend/intl-backend.js`,
    templateUrl: `../src/pages/intl-backend/intl-backend.html`,
    isPrefetch: false,
    isPreload: false
  }
];

