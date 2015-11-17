import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Api from './api'

Vue.use(VueRouter);
Vue.use(VueResource);

var Router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

Router.map({
    '/': {
        name     : 'home',
        component: require('./views/home.vue')
    },

    '*': {
        name     : 'any',
        component: require('./views/not-found.vue')
    }
});

Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector("meta[name=csrf-token]").content;

Object.defineProperties(Vue.prototype, {
    $api: {
        get: function() {
            return new Api(this);
        }
    },
});

Router.start(Vue.extend(require('./views/app.vue')), '#app');
