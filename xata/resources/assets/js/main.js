var Vue = require('vue'),
    VueRouter = require('vue-router'),
    VueResource = require('vue-resource');

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

// Resource
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector("meta[name=csrf-token]").content;

Router.start(Vue.extend(require('./views/app.vue')), '#app');
