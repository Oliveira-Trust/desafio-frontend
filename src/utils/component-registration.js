import Vue from 'vue';
// Components
import input from '@/components/custom/input';

export default () => {
    // register globally
    Vue.component('ot-input', input);
};
