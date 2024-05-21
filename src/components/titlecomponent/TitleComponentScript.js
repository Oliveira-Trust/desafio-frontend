import { globalVariables } from "../../global/VariaveisGlobais"

export default {
  name: 'TitleComponent',
  props: {
    
  },
  methods: {
    OpenAddModal() {
      globalVariables.addModalIsOpen=true; 
    },
  }
}