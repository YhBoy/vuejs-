.
<template>
	<div class="food_page" v-show="flag" ref="food" transition="move" res="food">
		<div class="detail_food">
			<div class="images_header">
				<img :src="food.image">
				<i class="detail_food_back" @click="hide"><img src="./detail_food_back.png"></i>
			</div>
			<div class="detail_food_content">
				<h1 class="detail_food_title">{{food.name}}</h1>
				<div class="detail_food_info">
					<span >月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}%</span>
				</div>
				<div class="detail_food_price">
					<span class="detail_food_newprice"><em>￥</em>{{food.price}}</span>
					<span class="detail_food_oldprice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cart_wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<div @click="addFirst(food,$event)" class="detail_food_buy" v-show="food.count===0 || !food.count">加入购物车</div>
			</div>
			<div>
				<split></split>
				<div class="shop_info">
					<h1>商品信息</h1>
					<p>{{food.info}}</p>
				</div>
			</div>
			<div class="ass">
				<split></split>
				<h1 class="ass_title">商品评价</h1>
				<ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll' 
import cartcontrol from "../cartcontrol/cartcontrol"
import Vue from "vue"
import split from "../split/split"
import ratingSelect from "../ratingSelect/ratingSelect"

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2 ;

export default {
	props : {
		food : {
			type : Object
		}
	},
	data (){
		return {
			flag : false,
			selectType:ALL,
			onlyContent : true,
			desc : {
				 all: "全部",
				 positive : "推荐",
				 negative : "吐槽"
			}
		}
	},
	methods:{
		show() {
			this.flag = true ;
			this.selectType = ALL,
			this.onlyContent = true,
			this.$nextTick( () =>{
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.food,{
						click:true
					})
				}else{
					this.scroll.refresh()
				}
			})

		},
		hide(){
			this.flag = false 
		},
		addFirst(food,event){
			if(!event._constructed){
				return;
			}
			//this.$emit('add', event.target);
			Vue.set(this.food,"count",1)
		}
	},
	components : {
		cartcontrol,
		split,
		ratingSelect
	}		
}
</script>

<style>
.food_page{ position:fixed;
            left:0;
            top:0;
            bottom:7rem;
            z-index:30;
            width:100%;
            background:#fff; }

.move-transition {
			transition : all 1s linear;
		    transform:translate3d(0,0,0);
}

.move-enter,.move-leave{
	 transform:translate3d(100%,0,0);
}

.images_header{ position:relative;
				width:100%;
				height:0;
				padding-bottom:100%; }

.images_header img{ position:absolute;
					left:0;
					top:0;
					width:100%;
					height:100%; }

.detail_food{ position:relative; }

.detail_food_back{ position:absolute;
				   top:10px;
				   left:10px;
				   display:block;
				   width:2rem;
				   height:2rem; }

.detail_food_content{ padding:2rem;
					  background:#fff;
					  position:relative; }
.detail_food_title{ color:#000;
					font-size:2rem;
					line-height:1.7;}

.detail_food_info span{ color:#999a9c;
						font-size:1.6rem;
						margin-right:0.3rem; }

.detail_food_price{ padding:3rem 0; }
.detail_food_newprice{  color:#f21411;
					    font-size:2rem;
					    font-weight:800;
					    }
.detail_food_newprice em{ font-size:1.6rem; }
.detail_food_oldprice{ color:#8e9397;
					   font-size:1.6rem;
					   text-decoration:line-through;}

.cart_wrapper{ position:absolute;
			   right:2rem;
			   top:8rem; }					    

.detail_food_buy{  position:absolute;
				   right:2rem;
				   top:8rem;
				   height:3rem;
				   line-height:3rem;
				   background:#00a0dc;
				   color:#fff;
				   padding:0 2rem;
				   border-radius:2rem;
				   text-align:center;
				   font-size:1.8rem; }

.shop_info{ padding:0 2rem;
			 }
.shop_info h1{ color:#080e1e;
			   font-size:2rem;
			   padding:2rem 0;  }
.shop_info p{ color:#53575a;
			  font-size:1.6rem;
			  line-height:3rem;
			  padding:0 1rem; }

</style>




