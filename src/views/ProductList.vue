<template>
  <div class="product-list">
    <h1>商品一覧</h1>
    <ul>
      <li v-for="{ id, name } in list" :key="id">
      <transition name="view">

        <router-link :to="`/product/${ id }`">{{ name }}</router-link>
      </transition>

      </li>
    </ul>
  </div>
</template>

<script>
  import products from '@/api/products.js'
  export default {
    computed: {
      list: () => products.fetch()
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
