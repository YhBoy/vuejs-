<template>
<div>
	<div class="goods">
		<div class="menu_wrapper" ref="menuWrapper">
			<ul >
				<li v-for="(item,index) in goods" class="menu_item " :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="menu_text border_1px">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods_wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="foods-list-hook">
					<h1 class="foods_wrapper_title">{{item.name}}</h1>
					<ul>
						<li @click="selectedFoods(food,$event)" class="foods_wrapper_list clearfix" v-for="food in item.foods">
							<div class="food_icon">
								<img :src="food.icon">
							</div>
							<div class="food_content">
								<h2 class="food_content_name">{{food.name}}</h2>
								<p class="food_content_desc">{{food.description}}</p>
								<div class="extra">
									<span class="extra_month">月售{{food.sellCount}}份</span>
									<span class="extra_month">好评率{{food.rating}}%</span>
								</div>
								<div class="food_price">
									<span class="food_price_new">￥{{food.price}}</span>
									<span class="food_price_old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="food_cartcontrol">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
		<shopcart :select-foods="selectFoods" :deliver-price="seller.deliverPrice" :min-price="seller.minPrice"></shopcart>
	
	<food :food="selectedFood" ref="food"></food>
</div>		
</template>
<script>

const  ERR_OK = 0 ;
import BScroll from "better-scroll"
import shopcart from "../shopcart/shopcart"
import cartcontrol from "../cartcontrol/cartcontrol"
import food from "../food/food"
export default {
	props : {
		seller : {
			type : Object
		}
	},
	data(){
		return {
			goods :[] ,
			listHeight:[],
			scrollY : 0,
			selectedFood : {}
		}
	},
	computed:{
		currentIndex(){
			for( let i=0; i<this.listHeight.length; i++){
				let height1 = this.listHeight[i]
				let height2 = this.listHeight[i+1]
				if( !height2 || ( this.scrollY >= height1 && this.scrollY < height2 ) ){
					return i ;
					
				}
			}

			return 0;
		},
	    selectFoods(){
	    	let foods = [];
	    	this.goods.forEach(function(good){
	    		good.foods.forEach(function(food){
	    			if( food.count ){
	    				foods.push(food);
	    			}
	    		})
	    	})
	    	return foods;
	    }
	},
	created(){
		this.$http.get("/api/goods").then( (response) => {
			response = response.body;
			if( response.erron === ERR_OK){
				this.goods = response.data;	
				this.$nextTick(() => {
			          this._initScroll();
			          this._calculateHeight(); 
		        });
			}
		})
	},
	methods:{
		 _initScroll() {
	        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
	          	click:true
	        })
	        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
	        	    click:true ,
	         		probeType : 3
	        })
	        this.foodsScroll.on("scroll", (pos) => {
	        	this.scrollY = Math.abs(Math.round(pos.y))

	        })
	    },
	    _calculateHeight(){
	    	let foodList = this.$refs.foodsWrapper.getElementsByClassName("foods-list-hook")
	    	let height = 0;
	    	this.listHeight.push(height)
	    	for( let i=0; i<foodList.length; i++){
	    		let item = foodList[i]
	    		height += item.clientHeight
	    		this.listHeight.push(height)	
	    	}
	    	
	    },
	    selectMenu (index,event){
		    if(!event._constructed){
		    	return ;
		    }
		    
		    let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
		    let el = foodList[index]
		    this.foodsScroll.scrollToElement(el, 300);
	    },
	    selectedFoods(food,event){
	    	 if(!event._constructed){
		    	return ;
		     }
		      this.selectedFood = food;
		      this.$refs.food.show();
       		 
	    }
	},
    components : {
		shopcart,
		cartcontrol,
		food
	}
	
}
</script>

<style>

.goods{ position:absolute;
		display:flex;
		overflow:hidden;
		height:56rem;
        width:100%;}

.menu_wrapper{ flex : 0 0 8rem;
               width:6rem;
               height:auto;
               background:#f3f5f7; }

.menu_wrapper ul{ height:auto;  }

.foods_wrapper{ flex :1 ; }
				  
.foods_wrapper ul{ height:auto;   }

.menu_item{ background:#f3f5f7;
            display:table;
            width:100%;
            height:7rem;}
            
.current{ background:#fff; }

.menu_text{ color:#07111b;
	        display:table-cell;
	        width:90%;
	        vertical-align:middle;
	        text-align:center;
	        margin:0 auto;
	        font-size:1.6rem; }

.border_1px{ border-bottom:1px solid #dbdee1; }

.food_icon{ float:left; width:30%; }
.food_icon img{ width:100%; }


.food_content{  margin-left:1.5rem;
				float:left;
              	width:65%;
               color:#2c3238;
               font-size:1.4rem; }

.extra_month{ color:#93999f;
              font-size:1.4rem;
              margin-right:1rem; }
.food_content_name{ color:#07111b;
                    font-size:2rem; }
.food_price_new{ color:#f01414;
                 font-size:1.4rem; }
.food_price_old{ color:#93999f;
                  font-size:1rem;}
.foods_wrapper_title{ color:#93999f;
                      height:3.4rem;
                      line-height:3.4rem;
                      font-size:1.8rem;
                      background:#f3f5f7;
                      border-left:2px solid #d9dde1;
                      padding-left:1.5rem; }

.foods_wrapper_list{  margin:0rem 1.5rem;
                      border-bottom:1px solid #d9dde1;
                      padding:2rem 0;
                      position:relative}

.food_content_desc{ margin:5px 0; }
.extra{ margin:0.5rem 0; }

.food_cartcontrol{ position:absolute;
                   right:1rem;
                   bottom:3rem; }

</style>








