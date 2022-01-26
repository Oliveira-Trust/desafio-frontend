import Vue from 'vue';

const contexts = [
    require.context("@/components/", true, /\.vue$/),
    require.context("@/layouts/", true, /\.vue$/),
    require.context("@/templates/", true, /\.vue$/),
];

contexts.forEach(context => {
    context.keys().forEach(key => {
        Vue.component(context(key).default.name, context(key).default);
    });
});

