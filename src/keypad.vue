<script>
export default{
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
	data(){
		return{
			keys:["1","2","3","4","5","6","7","8","9",".","0",""],
			money : '',
			activeKey:null,
			deleteInterval:null,
		}
	},
  methods : {
		press(num) {

			if(num==''){
				this.deleteKey();
			}else if(num=='.'){
				this.decimalPoint();
			}else{
				this.numberKey(num);
			}

		},
		//处理小数点函数
		decimalPoint() {
			//如果包含小数点，直接返回
			if (this.money.indexOf('.') > -1) return false;
			//如果小数点是第一位，补0
			if (!this.money.length){
					this.money = '0.';
			}else{
					this.money = this.money + '.';
			}
			this.$emit('input',this.money);
		},
		//处理删除键
		deleteKey() {
			if (!this.money.length) return false;
			this.money = this.money.substring(0, this.money.length - 1);
			this.$emit('input',this.money);
		},
			
		//处理数字
		numberKey(num) {
			//如果有小数点且小数点位数不小于2
			if ( this.money.indexOf('.') > -1 && this.money.substring(this.money.indexOf('.') + 1).length < 2)
				this.money = this.money + num;

			if (!(this.money.indexOf('.') > -1)) {
				if (num == '0' && this.money.length == 0)
					this.money = '0.';

				else {
					if (this.money.length && Number(this.money.charAt(0)) === 0) return;
					this.money = this.money + num;
				}
			}
			this.$emit('input',this.money);
		},
		hide(){
			this.$emit("hide");
		},
		start(num){
			if(num!="."&&num!=""){
				this.activeKey=num;
				window.setTimeout(()=>{
					this.activeKey=null;
				},100);
			}else if(num==""){
				this.deleteInterval=window.setInterval(()=>{
					this.deleteKey();
				},100);
			}
		},
		end(e){
			this.activeKey=null;
			this.deleteInterval && window.clearInterval(this.deleteInterval);
		}
	}
}
</script>

<template>
<div class='keypad' :class="{'active':show}">
	<div class="mask" @click="hide()"></div>
	<div class="keys">
			<span 
			v-for="key in keys" 
			:key="key" 
			@click="press(key)"
			@touchstart="start(key)"
			@touchend="end(key)"
			@mousedown="start(key)"
			@mouseup="end(key)"
			:class="{'transparent':key=='.'||key=='','delete':key=='','active':activeKey==key}">{{key}}</span>
	</div>
</div>
</template>


<style lang="less" scoped>
.keypad{
	position:fixed;
	left:0;
	right:0;
	bottom:0;
	top:0;
	opacity:0;
	pointer-events: none;
	transition: all 100ms cubic-bezier(0.19, 1, 0.22, 1);
	&.active{
		opacity:1;
		pointer-events: auto;
		.keys{
			transform: translateY(0px);
		}
	}
	.mask{
		position:absolute;
		left:0;
		right:0;
		bottom:0;
		top:0;
	}
	.keys{
		position:absolute;
		left:0;
		right:0;
		bottom:0;
		height:250px;
		padding:5px 5px 30px 5px;
		display:flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap:wrap;
		background-color:#d1d5da;
		transform: translateY(250px);
		transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
		span{
			user-select: none;
			margin:3px;
			border-radius: 8px;
			background: #fcfcfd;
			position: relative;
			text-align: center;
			cursor: pointer;
			width: 33.33333333%;
			width: calc(100% / 3 - 6px );
			font-size: 28px;
			height: 50px;
			line-height: 50px;
			box-shadow: 0 1px 0 0 #989899;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			
			&.transparent{
				box-shadow: none;
				background:transparent;
			}
			&.delete{
				background-repeat:no-repeat;
				background-position:center;
				background-size: 22px 16px;
				background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 16'><path d='M18,0h-8C8.9,0,7.9,0.5,7.1,1.2c0,0,0,0,0,0L1,7.2C0.6,7.7,0.6,8.4,1,8.8l4.9,4.7L7,14.6c0,0,0,0,0,0c0.7,0.9,1.8,1.4,3,1.4 h8c2.2,0,4-1.8,4-4V4C22,1.8,20.2,0,18,0z M17.3,11.2l-0.7,0.7l-3.2-3.2l-3.2,3.2l-0.7-0.7L12.8,8L9.6,4.8l0.7-0.7l3.2,3.2l3.2-3.2 l0.7,0.7L14.2,8L17.3,11.2z' fill='%23000000'/></svg>");
			}
			&.active {
					background: #bcc0c5;
			}
		}
	}
    
}
</style>