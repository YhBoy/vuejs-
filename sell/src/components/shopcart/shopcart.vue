<template>
	<div class="shopcart">
		<div class="shopcart_content clearfix">
			<div class="shopcart_content_left " @click="toggleList">
				<div class="shop_logo_wrapper">
					<div class="shop_logo" :class="{'shop_logo_light': totalCount > 0}">
						<span class="icon_shop_cart1" :class="{'icon_shop_cart2' : totalCount > 0}"></span>
					</div>
					<div class="shop_num" v-show="totalCount > 0">
						{{totalCount}}
					</div>
					
				</div>
				<div class="shop_price" :class="{'shop_price1' : totalCount > 0}">￥{{totalPrice}}</div>
				<div class="shop_desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="shopcart_content_right">
				<div class="pay" :class="payClass" >
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="shopcart_list" v-show="listShow">
			<div class="list_header">
				<h1 class="list_title">购物车</h1>
				<span class="list_empty" @click="listEmpty">清空</span>
			</div>
			<div class="list_content" ref="listContent">
				<ul>
					<li class="list_food clearfix" v-for="food in selectFoods">
						<span class="list_content_name" >{{food.name}}</span>
						<div class="list_content_price">￥{{food.price * food.count}}</div>
						<div class="list_content_cart">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
</template>

<script>
import cartcontrol from "../cartcontrol/cartcontrol"
import BScroll from "better-scroll"

export default {
	props : {
		selectFoods: {
	        type: Array,
	        default() {
		          return []
	        }
      },
		deliveryPrice : {
			type : Number,
			default : 0
		},
		minPrice : {
			type : Number,
			default : 0
		}
	},
	data(){
		return {
			fold: true
		}
	},
	computed : {
		totalPrice() {
	        let total = 0;
	        this.selectFoods.forEach((food) => {
	          total += food.price * food.count;
	        });
	        return total;
        },
        totalCount (){
        	let count = 0;
	        	 this.selectFoods.forEach((food) => {
		         count += food.count;
	        });
	        return count;
        },
        payDesc (){
        	if( this.totalPrice === 0){
        		return `还差￥${this.minPrice}元起送`;
        	}else if( this.totalPrice < this.minPrice ){
        		 let diff = this.minPrice - this.totalPrice;
          		 return `还差￥${diff}元起送`;
        	}else{  
        		return `去结算`;
        	}
        },
        payClass(){
        	if( this.totalPrice < this.minPrice ){
        		return "pay_not_enough"
        	}else{
        		return "pay_enough"
        	}
        },
        listShow(){
        	if( !this.totalCount ){
        		this.fold = true;
        		return false;
        	}

        	let show = !this.fold
        	if( show ){
        		this.$nextTick(function(){
        			if( !this.scroll ){
        				this.scroll = new BScroll( this.$refs.listContent,{
        					click : true 
        				})
        			}else{
        				this.scroll.refresh()
        			}
        		})
        	}
        	return show

        }
	},
	methods : {
		toggleList(){
			if( !this.totalCount ){
				return 
			}
			this.fold = !this.fold;
		},
        listEmpty(){
        	this.selectFoods.forEach(function(food){
        		food.count = 0;
        	})
        }
	},
	components : {
		cartcontrol
	}
}

</script>

<style>
.shopcart{ position:fixed;
           left: 0;
           width:100%;
           bottom:0;
           z-index:50;
           background:#141d27;
           height:7rem;}

.shopcart_content{   }

.shop_logo_wrapper{  display:inline-block;
                     position:relative;
                     margin:0 2rem;
                     top:-1.4rem;
                     width:8rem;
                     height:8rem;
                     padding:10px; 
                     border-radius:50%;
                     background:#141d27;
                     float:left;}

.shop_logo{ display:inline-block;
            width:100%;
            height:100%;
            border-radius:50%;
            background:rgba(255,255,255,0.2);
            position:relative; }

.shop_logo_light{ background:#00a0dc; }

.icon_shop_cart1{ background:url(./icon_shop_cart1.png) no-repeat;
                  width:3.6rem;
                  height:3.6rem;
                  background-size:100% 100%;
                  display:block;
                  position:absolute;
                  left:50%;
                  top:50%;
                  margin-left:-2rem;
                  margin-top:-2rem;
                  }

.icon_shop_cart2{ 
				  background:url(./icon_shop_cart2.png) no-repeat;
                  width:3.6rem;
                  height:3.6rem;
                  background-size:100% 100%;
                  display:block;
                  position:absolute;
                  left:50%;
                  top:50%;
                  margin-left:-2rem;
                  margin-top:-2rem;	
 }

.shop_num{ display:block;
           width:3rem;
           height:2rem;
           background:#f01414;
           border-radius:1rem;
           color:#fff;
           text-align:center;
           line-height:2rem;
           position:absolute;
           right:0rem;
           top:0rem;
           font-size:1.5rem;
           font-weight:bold;}

.shop_price{ display:inline-block;
             font-size:2rem;
             color:#919396; 
             float:left;
             border-right:2px solid #fff;
             line-height:3rem;
             padding-right:1.5rem;
             margin-top:1.8rem;
             font-weight:bold;}

.shop_price1{ color:#fff; }

.shop_desc{ display:inline-block;
		    float:left;
		    color:#919396;
		    font-size:2rem;
		    line-height:7rem;
		    padding-left:1.5rem;}

.shopcart_content_left{ width:72%;
                        float:left; }

.shopcart_content_right{ width:28%; 
                         float:left;
                         height:7rem;
                        }

.pay{ width:100%;
      height:7rem;
      line-height:7rem;
      background:#2b333b;
      text-align:center; 
      font-weight:bold;
      font-size:2rem;
      color:#979a9c;
      display:block;}

.pay_not_enough{ background:#2b333b;
				 width:100%;
			      height:7rem;
			      line-height:7rem;
			      background:#2b333b;
			      text-align:center; 
			      font-weight:bold;
			      font-size:2rem;
			      color:#979a9c;
			      display:block; }
.pay_enough { width:100%;
		      height:7rem;
		      line-height:7rem;
		      background:#00a0dc;
		      text-align:center; 
		      font-weight:bold;
		      font-size:2rem;
		      color:#fff;
		      display:block;}

.shopcart_list{ position:absolute;
			    left:0;
			    top:-45rem;
			    z-index:-1;
			    width:100%; 
			    height:45rem;
			    background:#141d27;}

.list_header{ height:5rem;
 			  line-height:5rem;
 			  background:#f3f5f7;
 			  border-bottom:1px solid #dbdee1;}

.list_title{  color:#07111b;
              font-size:2rem;
              padding-left:2.2rem;
              float:left; }
.list_empty{ float:right;
             color:#00a0dc;
             font-size:1.8rem;
             padding-right:2rem;}

.list_content{ height:40rem;
               overflow:hidden;}             

.list_food{ height:6rem;
            border-bottom:1px solid #e6e7e8; }
.list_content_name{ float:left;
                    width:60%;
                    color:#fff;
                    font-size:2rem;
                    line-height:6rem;
                    padding-left:2rem }
.list_content_price{ float:left; 
                     width:20%;
                     font-weight:bold;
                     color:#fff;
                     font-size:2rem;
                     line-height:6rem;}
.list_content_cart{ float:left;
                    width:20%;
                    margin-top:1.8rem;
                    color:#fff; }

.bg_mask{ position:absolute;
          width:100%;
          height:100%;
          left:0;
          top:0;
          background:rgba(0,0,0,0.3);
           }



</style>


