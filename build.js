var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var npm = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var vue = require('rollup-plugin-vue');

rollup.rollup({
    entry: 'src/index.js', // 打包入口文件
    plugins: [
        vue(),
        npm({ jsnext: true, main: true }),
        commonjs(), // 支持CommonJS模块语法
        babel({  // babel配置
            exclude: 'node_modules/**',
            presets: [ 'es2015-rollup' ]
        })
    ],
    external: [ // 不被打包的库，比如在项目中会被引入
        'vue'
    ]
}).then(function(bundle) {
    bundle.write({
        format: 'umd',  // 指定要打包成什么格式
        moduleName: 'vueKeypad',
        dest: 'dist/vue-keypad.js' // 编译完的文件需要被存放的路径
    });
}).catch((error) => {
    console.log(error);
});

rollup.rollup({
    entry: 'src/index.js', // 打包入口文件
    plugins: [
        vue(),
        npm({ jsnext: true, main: true }),
        uglify(), // 压缩代码
        commonjs(), // 支持CommonJS模块语法
        babel({  // babel配置
            exclude: 'node_modules/**',
            presets: ['es2015-rollup']
        })
    ],
    external: [ // 不被打包的库，比如在项目中会被引入
        'vue'
    ]
}).then(function (bundle) {
    bundle.write({
        moduleName: 'vueKeypad',
        format: 'iife',  // 指定要打包成什么格式
        dest: 'dist/vue-keypad.min.js' // 编译完的文件需要被存放的路径
    });
}).catch((error) => {
    console.log(error);
});
