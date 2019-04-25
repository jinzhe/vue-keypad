vue-keypad
=============

基于 Vue.js 的模拟数字键盘插件 

## 安装

```sh
npm install --save vue-keypad
```

## 使用
首先在项目的入口文件中引入, 调用 Vue.use 安装。

```javascript
import vue-keypad from 'vue-keypad'
Vue.use(vue-keypad)
```

```HTML
<div id="app">
    <div @click="input()">${{money}}</div>
    <keypad :show="keypad.show" @input="input()"></keypad>
</div>
```

```javascript
export default {
  data() {
    return {
        money:"",
        keypad:{
            show:false,
            input:(value)=>{
                this.form.spentAmount=value;
            }
        },
    },
    methods:{
        input(){
            this.keypad.show=true;
            this.keypad.input=(value)=>{
                this.money=value;
            }
        }
    }
}
```