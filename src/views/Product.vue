<template>
  <div class="product" v-if="item" key="product">
    <p>このページは ID.{{ $route.params.id }} の詳細を表示する</p>

    <h1>商品情報</h1>
    <dl class="product-table">
      <dt>商品名</dt>
      <dd>{{ item.name }}</dd>
      <dt>価格</dt>
      <dd>{{ item.price }}円</dd>
      <dt>商品説明</dt>
      <dd>{{ item.content }}</dd>
    </dl>
    <h1>{{ detail.name }}</h1>
    <nav class="nav">
      <router-link :to="{ name: 'product-home' }">商品詳細</router-link>
      <router-link :to="{ name: 'product-review' }">レビュー</router-link>
    </nav>
    <!-- ここに子ルートを埋め込む -->
    <transition name="view">
  <router-view />
</transition>
    <router-link to="/product"><h1>BACK</h1></router-link>
  </div>
  <div v-else key="loading">商品情報を読み込んでいます...</div>
</template>

<script>
  import products from '@/api/products.js'
  import {mapGetters} from 'vuex'

  export default {
    props: {
      id: Number
    },
    data() {
      return {
        item: null
      }
    },
    computed: mapGetters('product', ['detail']),

    watch: {
      id: {
        handler() {
          products.asyncFind(this.id, item => {
            this.item = item
          })
        },
        immediate: true
      }
    },
    beforeDestroy() {
      this.$store.dispatch('product/destroy')
    }
  }

</script>

<style>
  .view-enter-active, .view-leave-active {
  transition: opacity 0.5s;
}
.view-leave-active {
  position: absolute;
}
.view-enter, .view-leave-to {
  opacity: 0;
}
</style>
