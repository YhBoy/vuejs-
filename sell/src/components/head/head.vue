<template>
	<div class="header">
		<div class="content_wrapper clearfix">
			<div class="avatar">
				<img :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title clearfix">
					<span class="brand">品牌</span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support clearfix" v-if="seller.supports">
					<span class="icon">减</span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="support_count" v-if="seller.supports" @click="showDetail">
			<span class="count">{{seller.supports.length}}个 > </span>
		</div>
		<div class="bulletin_wrapper">
			<span class="bulletin_title">公告</span>
			<span class="bulletin_text">{{seller.bulletin}}</span>
		</div>
		<div class="background">
			<img :src="seller.avatar"  >
		</div>
		<div class="detail" v-show="detailShow">
			<div class="detail_wrapper clearfix">
				<div class="detail_main">
					<h1 class='detail_name'>{{seller.name}}</h1>
					<star :score="seller.score"></star>
					<div class="detail_title">
						<div class="line"></div>
						<div class="txt">优惠信息</div>
						
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support_item" v-for="(item,index) in seller.supports">	
							<span class="supports_icon">{{seller.supports[index].description}}</span>
						</li>
					</ul>
					<div class="detail_title">
						<div class="line"></div>
						<div class="txt">商家公告</div>
						
					</div>
					<div class="instr">{{seller.bulletin}}</div>
				</div>
			</div>
			<div class="detail_close" @click="detial_close"><img src="./detail_close.png"></div>
		</div>
	</div>
</template>
<script>
import star from '../star/star';
export default {
	props : { 
		seller : {
			type : Object
		}
	},
	data(){
		return {
			detailShow : false
		}
	},
	methods :{
		showDetail(){
			this.detailShow = true
		},
		detial_close(){
			this.detailShow = false
		}
	},
	components : {
		star
	}
}
</script>
<style>
.header{ position:relative; background: rgba(7,17,27,0.5);overflow:hidden;}
.content_wrapper{ padding:2.5rem; }
.avatar{ width:8.5rem; 
         height:8.5rem;
         float:left; 
         border-radius:5px;
         overflow:hidden;}
.avatar img{ display:block;
             width:100%; }
.content{ float:left; 
          margin-left:2rem;}

.brand{ background:#e91a22;
        color:#fff; 
        padding:0px 4px;
        border-radius:3px;
        font-size:1.5rem;
        font-weight:bold;
        height:2.3rem;
        line-height:2.3rem;
        display:inline-block; 
        float:left;
        margin-top:3px;}
.name{ font-size:2rem;
        color:#fff;
        display:block;
        float:left; 
        margin-left:1rem; }

.description{ font-size:1.8rem;
              color:#fbf6f2; 
              margin:0.7rem 0;}

.icon{ display:block;
       float:left;
       font-size:1.3rem;
       
       background:#ccc;
       border-radius:3px;
       color:#f67182;
       padding: 2px 4px; }
.text{ display:block;
       float:left;
       font-size:1.5rem;
       margin-top:1px;
       margin-left:1rem;
       color:#fdfdfb;}

.support_count{ position:absolute;
                right:2rem;
                top:8.5rem;
                display:block;
                width:6rem;
                height:3.5rem;
                line-height:3.5rem;
                border-radius:1.5rem;
                background:#fff;
                font-size:1.5rem; 
                text-indent:1.5rem;}

.bulletin_wrapper{ height:3.6rem;
					line-height:3.6rem;
                   padding:0 1.5rem;
                    white-space:nowrap;
                   overflow:hidden;
                   text-overflow:ellipsis;
                   background:#403b35;}

.bulletin_title{ font-size:1.2rem;
                 color:#38424b;
                 font-weight:bold; 
                 padding:2px 5px;
                 overflow:hidden;
                 border-radius:5px;
                 background:#fff;}
.bulletin_text{ font-size:1.2rem;
                 color:#fff;
                 font-weight:bold; 
                 }
.background{ position:absolute;
             left:0;
             top:0;
             width:100%;
             height:100%; 
             z-index:-1;
             filter:blur(10px);}

.background img{ width:100%;
                 height:100%; }

.detail{ position:fixed;
         width:100%;
         height:100%;
         z-index:100;
         background:rgba(7,17,27,1);
         overflow:auto;
         top:0;
         left:0; }

.detail_wrapper{
		 min-height:100%;
}

.detail_main{ 
		 margin-top:4rem;
		 padding-bottom:6rem;	
}

.detail_close{  position:relative;
                width:3.2rem;
                height:3.2rem;
                bottom:6rem;
                left: 50%;
                margin-left:-1.6rem;

                clear:both;}

.detail_close img{ width:100%;
                   display:block;
                   margin:0 auto; }
.detail_name{ color:#fff;
       text-align:center;
       font-size:2.2rem;
       margin-bottom:2rem; }

.detail_title{ width:80%;
               margin: 4rem auto;
               position:relative;
               }

.line{ border-top:1px solid #61676d;
       position:relative;
       left:0;
       width:100%;
       top:1.5rem;
       z-index:-1; }

.txt{ padding:0 1rem;
       color:#fff;
       text-align:center;
       font-size:2rem;
       font-weight:bold;
       background: rgba(7,17,27,1);
       width:40%;
       margin:0 auto; }

.supports{ width:70%;
           margin: 0 auto;
            }

.supports_icon{ font-size:1.6rem;
                color:#fff; 
                line-height:2;}


.instr{ width:80%;
        margin:0 auto;
        color:#fff;
        font-size:1.6rem;
        line-height:1.8; }





</style>