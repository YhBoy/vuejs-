<template>
	<div class="star" >
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star_item"></span>	
	</div>
</template>

<script>

	const LENGTH = 5;
	const CLS_ON = "on";
	const CLS_HALF = "half";
	const CLS_OFF = "off";

export default{ 

	props : {
		score : {
			type : Number
		}
	},
	computed : {

		itemClasses(){
			let result = [  ];
			let score = Math.floor(this.score*2)/2;

			let hasDecimal = score % 1 !==0; // 计算半星是否存在
			let integer = Math.floor(score) // 计算全星

			for( let i=0; i<integer; i++ ){
				result.push(CLS_ON)
			}

			if( hasDecimal ){
				result.push(CLS_HALF)
			}

			while( result.length < LENGTH){
				result.push(CLS_OFF)
			}

			return result ;

		}	
	}
}


</script>

<style>
.star{ text-align:center; }
.star_item{ display:inline-block;
            background-repeat : no-repeat; 
            width:2.6rem;
            height:2.6rem;
            margin-right:1.6rem;}

.star_item.on{  background:url(./star_on.png) no-repeat; background-size:100% 100%;}
.star_item.half{ background:url(./star_half.png) no-repeat; background-size:100% 100%;}
.star_item.off{ background:url(./star_off.png) no-repeat; background-size:100% 100%;}


</style>






