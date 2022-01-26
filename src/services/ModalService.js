import Vue from 'vue';

// Poderia fazer com VUEX mas como é algo simples,
// deixei desta forma para demonstração de conhecimento em 
// controle de state com barramento

export default new Vue({
  methods: {
    open(component, props = {}) {
      return new Promise((resolve, reject) => {
        this.$emit('open', { component, props, resolve, reject });
      });
    }
  }
});