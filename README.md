## fx-h5-mpa 
> 项目灵感来源于日常H5开发，属于多页应用开发。

1. 思考了SSR 和预编译的方案，但是并不是什么应用拿来做SSR都是合适的，SSR需要后端和服务器做相应的配合，在发布上来说也不是最优解。
2. 而预编译的结果存在时间差，在考虑了H5业务的复杂度最后选择优化打包结果。
3. 项目会结合常用的业务特色封装一个开箱即用的项目。
4. 目前公司内部所使用的H5开发脚手架一共两个，一个的webpack版本过低，没有及时更新享受不到新版本的优化，存在部分可优化点。

## 为什么用它？
1. 大幅度改善老的配置 <br/>
  1.1 插件老化<br/>
  1.2 构建速度老化<br/>
  1.3 打包优化<br/>
  1.4 新增国际化方案<br/>
  1.5 新增静态资源打包方案<br/>
  1.6 样式模块化<br/>
  1.7 按需引入<br/>
  1.8 prefetch<br/>
  1.9 热模跨更新<br/>
  2.0 性能监控<br/>
  ...
## 特性
- [x] 新增自动清除打包的文件 <br/>
- [x] live-loading <br/>
- [x] 支持JSON格式文件 <br/>
- [x] CDNbots使用 <br/>
   + 以使用number.js 为例
- [x] 支持css( 在开发环境使用表现为内联样式， 在生产环境表现为外联样式) <br/>
- [x] 支持sass <br/>
- [x] 🍉按需引入指定平台的样式文件(详见测试代码，规则: 以移动端样式为主)<br/>
  默认断点：<br/>
  + @media print, screen and (min-width: 1024px)  <br/>
  + @media print, screen and (min-width: 768px) and (max-width: 1023px)  <br/>
- [x] 自定义样式编译目标（https://github.com/browserslist/browserslist#queries）: 默认 （https://browserl.ist/?q=defaults）<br/>
- [x] css autoprefix <br/>
- [x] css 支持最新特性 <br/>
- [x] css in js
  + 样式模块化只对类有作用<br/>
  + 需要进行css in js 作用的样式文件名称以`-scop`结尾 <br/>
  + 避免命名冲突 <br/>
  + 对全局的样式文件都能在js模块中直接获取 <br/>
- [x] 支持间接图片资源（png、jpeg、jpg、svg） <br/>
  + 小于一定尺寸的jpg图片自动压缩成base64显示<br/>
  + svg不适合赚base64,反而会变大，所以这里特别处理（https://github.com/tigt/mini-svg-data-uri） 将SVG转换为最紧凑、最可压缩的数据（结果数据使用url(...) <img src="...">）
  + 支持在JS模块文件中直接使用图片 <br/>
  + 图片资源在HTML中的显示（使用html-lodaer 开启其minimize不能正确处理svg,然后又因为和html-webpack-plugin的minify冲突，所以我这里就关闭了html-loader的minimize）<br/>
  + 开发和生产环境打包的结果都需要一个资源服务器进行访问才能正常显示资源
  + 对于JS模块中使用的路径形式(如: new Image().src='../../assets/a.svg')类似的静态资源文件，请放置到assets/public ，目录下
- [x] 样式压缩(只在生产环境开启)<br/>
- [x] 环境变量设置（抹平平台差异）<br/>
  + 通过process.env 获取环境变量 <br/>
- [x] 支持代码分片，提取公共模块 <br/>
- [x] JS支持新特性（目前测试通过低端设备浏览器chrome 48） <br/>
- [x] 对生产环境下语义化模块名称和异步引用的module名称，方便调试 <br/>
- [x] JS代码分片(抽取公共的LIBing) <br/>
    + 长效缓存 <br/>
      + 对每个bundle 设置contentHash, 在内容没有改变的情况下hash值不变 ，实现缓存策略
      + ~~为每个entry抽取runtime代码，在修改entry module内容时候只改变module的hash而不改变runtime的hash从而实现长效缓存~~
        由于考虑用预加载的方式，对于运行时的代码分不分包都一样吧
- [x] 预加载(preload) <br/>
      + 资源是当前导航的资源
      + 通过配置文件设置模块是否进行preload
- [x] 预加载(prefetch) <br/>
      + 资源是未来导航的资源
      + 通过配置文件设置模块是否进行prefetch
- [x] 懒加载 <br/>
- [x] 初始化工程打包后9K <br/>
- [x] 自定义入口文件（思路：本来想写自动的，但是涉及到预加载的操作需要由使用的人指定，并且这里做成自动的对于开发者使用来说限制很大，固定存放目录位置有点不灵活，所以还是抽成一个配置文件暴露给开发者使用） <br/>
- [x] 解决数字精度和与国家化千分位为题
  + 查阅cdn.js
- [x] 缺位补零
  + 查阅cdn.js
- [x] 国际化解决方案(https://github.com/i18next/i18next)  <br/>
  + 支持异步请求不同语言版本JSON翻译文件
  + 支持常规翻译操作
  + 同一个语言翻译文件如果被分成多个文件，没个文件对应一个模块，需要设置默认显示模块
  + 支持根据上下文语义进行翻译
  + 支持单复数翻译（有默认的，也可以自定义单复数范围设置）
  + 支持时间国际化
  + 支持金额国际化（同时支持大数）
- [x] 开箱即用 <br/>
- [x] 摇树编译（usedExports， sideEffect: true） <br/>
  + 在mode:production模式下默认开启要是编译，如果有一些库封装不支持ESM的话，摇树编译是无法达到效果的。
- [x] 监控分析(模块依赖分析、模块体积分析) <br/>
- [x] 集成大数支持 <br/>
  + 如果不是创世区块这种超出了bigbumberjs库可处理范围，就使用bignumberjs，
  + 支持ES7新特性bigInt
- [ ] 测试 <br/>
- [ ] 集成补零函数 <br/>
- [ ] 科学获取package.json配置信息 <br/>
- [ ] 图片懒加载 <br/>
- [ ] 自动化骨架屏（https://github.com/famanoder/dps） <br/>
- [ ] 移动端样式文件结构（支持转换 <br/>
  + postcss-px2rem（不要手算的方式进行转换）



## TO DO 
1. 样式模块化 在思考是否真的需要 (A: 需要，已加)

## 项目结构
1. 在module-config.js文件中配置模块信息

## 注意事项
1. 引用模块请写明文件后缀；
2. 注意样式引用的顺序；
3. 对于使用了mini-css-extract-plugin 中设置的异步加载样式文件的作用会与media-query-plugin的作用相同

## CDNbots使用
在H5项目中，我们希望能尽可能的减少包的体积，于是，对于一些常规库我们使用了CDN进行优化包的体积，
但是这时候希望能像使用node_module 的方式引用，于是有这一特性的支持

## 分析器
1. bundle-buddy-webpack-plugin ： 分析重复项
2. webpack-bundle-analyzer: 打包分片分析
3. webpack-monitor: 模块打包分析，优化建议
