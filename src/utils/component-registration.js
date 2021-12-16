import Vue from 'vue';
// Components
import input from '@/components/custom/input';
import button from '@/components/custom/button';
import modal from '@/components/custom/modal';
import table from '@/components/custom/table';

export default () => {
    // register globally
    Vue.component('ot-input', input);
    Vue.component('ot-button', button);
    Vue.component('ot-modal', modal);
    Vue.component('ot-table', table);
};
