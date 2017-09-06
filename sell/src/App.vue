<template>
  <div id="app">
    <HeadTop :seller="seller"></HeadTop>
    <div class="tab">
        <div class="tab_item">
            <router-link to="/goods">商品</router-link>
        </div>
         <div class="tab_item">
            <router-link to="/ratings">评价</router-link>
        </div>
         <div class="tab_item">
            <router-link to="/sellers">卖家</router-link>
        </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import HeadTop from './components/head/head'

const ERR_OK = 0 ;
export default {
  data() {
    return {
      seller : {
        
      }
    }
  },
  created() {
      this.$http.get('/api/seller').then(function(response){
            response = response.body;
            if( response.erron === ERR_OK){
                this.seller = response.data ;  
            }
      })
  },
  components: {
    HeadTop
  }
}
</script>

<style>
.tab{ width:100%;
      display : flex;
      border-bottom:1px solid #e5e5e5; }
.tab_item{ flex : 1;
            color:#000;
           text-align:center;
             font-size:1.8rem;
             line-height:5.3rem;
             height:5.3rem; }
.tab_item a{ color:#000; 
             display:block;}

.tab_item a.active{ color:red; }
</style>
