<template>
	<div class="cartcontrol clearfix">
		<div class="cart_descrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
			<span></span>
		</div>
		<div class="cart_count" v-show="food.count>0" >{{food.count}}</div>
		<div class="cart_add move_transition_right" @click.stop.prevent="addCart"></div>
	</div>

</template>

<script>
import Vue from "vue"
export default {
	props : {
		food : {
			type :Object
		}
	},
	
	methods : {
		addCart(event){
			if(!event._constructed){
				return ;
			}
			if(!this.food.count){
				Vue.set(this.food, "count" ,1)
			}else{
				this.food.count ++ 
			}
		},
		decreaseCart(){
			if(!event._constructed){
				return ;
			}
			if(this.food.count){
				this.food.count--;
			}
		}
	}	
}
</script>

<style>
.cart_descrease{   display:block;
                   width:2.5rem;
                   height:2.5rem;
                   background:url(./derease.png) no-repeat;
                   background-size:100% 100%;
                   float:left;
                   opacity :1; }

.cart_count{  font-size:1.8rem;
			  width:50px;
			  float:left;
			  text-align:center; }
.cart_add{ 		   display:block;
                   width:2.5rem;
                   height:2.5rem;
                   background:url(./add.png) no-repeat;
                   background-size:100% 100%;
                   float:left;}

.move_transition_right{  }

</style>

