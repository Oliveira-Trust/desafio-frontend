import Vue from 'vue';
// Components
import input from '@/components/custom/input';
import button from '@/components/custom/button';

export default () => {
    // register globally
    Vue.component('ot-input', input);
    Vue.component('ot-button', button);
};
