<template>
	<div class="ratingSelect">
		<div class="rating_type">
			<span @click="select(2,$event)" class="block positive" :class="{'current':selectType===2}">{{desc.all}}<span class="num">47</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'current':selectType===0}">{{desc.positive}}<span class="num">40</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'current':selectType===1}">{{desc.negative}}<span class="num">10</span></span>
		</div>
		<div class="switch clearfix" >
			<span @click="toggleContent($event)" class="switch_check "  :class="{'switch_oncheck' :onlyContent }"></span>
			<span class="switch_con">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default{
	props:{
		ratings:{
			type:Array,
			default(){   //对象默认要返回一个function（里边是return）
				return [];
			}
		},
		selectType:{
			type:Number,
			default:ALL
		},
		onlyContent:{
			type:Boolean,
			default:false
		},
		desc:{
			type:Object,
			default(){
				return{
					all:"全部",
					positive:"满意",
					negative:"不满意"
				}
			}
		}
	},
	
	methods:{
		select:function (type,event) {
			if(!event._constructed){
				return;
			}
			
			this.$emit('',type);	
		},
		toggleContent(event) {
	        if (!event._constructed) {
	          return;
	        }
	        
	        this.$emit('toggle');
	      }
	}
};

</script>
<style>

.switch{ padding:1rem 2rem;
		 border-bottom:1px solid #e6e6e6; }

.switch_check{  display:inline-block;
				width:2.6rem;
				height:2.6rem;
				background:url("./check.png") no-repeat;
				background-size:100% 100%;
				float:left;}

.switch_oncheck{ display:inline-block;
				 width:2.6rem;
				 height:2.6rem;
				 background:url("./oncheck.png") no-repeat;
				 background-size:100% 100%;
				 float:left; }

.switch_con{ font-size:2rem;
			 color:#b9bcc1;
			 float:left; }

.rating_type{  padding:1rem 2rem;
			   border-bottom:1px solid #e8e8e8;
			   font-size:2rem; }

.block{ display: inline-block;
        padding: 1rem;
        margin-right: 8px; 
        border-radius: 0.2rem;
        font-size: 2rem;
        color:rgb(77,85,93);}
.block.current{ color:#fff; }


.positive{ background:rgba(0,160,220,0.2); }
.positive.current{  background:rgb(0,160,220);  }		   
.negative{ background:rgba(77,85,93,0.2); }

.num{ font-size:1.4rem;
	  margin-left:0.4rem;} 



</style>