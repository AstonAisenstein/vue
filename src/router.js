import Vue from 'vue'
import VueRouter from 'vue-router'
// ルート用のコンポーネントを読み込む
import Home from '@/views/Home'
import ProductList from './views/ProductList'
import Product from '@/views/Product'
// Productの子ルートたち
import ProductHome from '@/views/Product/Home'
import ProductReview from '@/views/Product/Review'
import ProductReviewDetail from '@/views/Product/ReviewDetail'

// Vuexと同様で最初にプラグインとして登録
Vue.use(VueRouter)
// VueRouterインスタンスを生成する
const router = new VueRouter({
	mode: 'history',
  // URLのパスと紐づくコンポーネントをマッピング
  routes: [
    {
      path: '/',
      component: Home
    },
		{
			path: '/product',
			component: ProductList
		},
    {
      path: '/product/:id',
      component: Product,
			props: route => ({
				id: Number(route.params.id)
			}),
			children: [
				{
          name: 'product-home',
          path: '',
          component: ProductHome
        },
        // 商品のレビュー一覧
        {
          name: 'product-review',
          path: 'review',
          component: ProductReview
        },
        // 商品のレビュー詳細
        {
          name: 'review-detail',
          path: 'review/:rid', // 親ルートとかぶらないパラメータを指定
          component: ProductReviewDetail,
          props: route => ({
            rid: Number(route.params.rid)
          })
        }
			]
    }
  ]
})
// 生成したVueRouterインスタンスをエクスポート
export default router
