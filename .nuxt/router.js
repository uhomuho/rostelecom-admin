import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _977f536a = () => interopDefault(import('../pages/packages/index.vue' /* webpackChunkName: "pages/packages/index" */))
const _325269c0 = () => interopDefault(import('../pages/regiones/index.vue' /* webpackChunkName: "pages/regiones/index" */))
const _a50d8f08 = () => interopDefault(import('../pages/services/index.vue' /* webpackChunkName: "pages/services/index" */))
const _22376147 = () => interopDefault(import('../pages/tariffs/index.vue' /* webpackChunkName: "pages/tariffs/index" */))
const _e7674bd4 = () => interopDefault(import('../pages/packages/create/index.vue' /* webpackChunkName: "pages/packages/create/index" */))
const _92235a4e = () => interopDefault(import('../pages/tariffs/add/index.vue' /* webpackChunkName: "pages/tariffs/add/index" */))
const _69c15894 = () => interopDefault(import('../pages/packages/_id/index.vue' /* webpackChunkName: "pages/packages/_id/index" */))
const _486c9532 = () => interopDefault(import('../pages/services/_id/index.vue' /* webpackChunkName: "pages/services/_id/index" */))
const _006080b2 = () => interopDefault(import('../pages/tariffs/_id/index.vue' /* webpackChunkName: "pages/tariffs/_id/index" */))
const _36e99487 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/packages",
    component: _977f536a,
    name: "packages"
  }, {
    path: "/regiones",
    component: _325269c0,
    name: "regiones"
  }, {
    path: "/services",
    component: _a50d8f08,
    name: "services"
  }, {
    path: "/tariffs",
    component: _22376147,
    name: "tariffs"
  }, {
    path: "/packages/create",
    component: _e7674bd4,
    name: "packages-create"
  }, {
    path: "/tariffs/add",
    component: _92235a4e,
    name: "tariffs-add"
  }, {
    path: "/packages/:id",
    component: _69c15894,
    name: "packages-id"
  }, {
    path: "/services/:id",
    component: _486c9532,
    name: "services-id"
  }, {
    path: "/tariffs/:id",
    component: _006080b2,
    name: "tariffs-id"
  }, {
    path: "/",
    component: _36e99487,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
