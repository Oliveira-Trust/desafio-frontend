<template>
    <v-card id="modal" class="pr-5 pl-5 pb-5">
      <v-card-title class="border">        
          <h2 >
            {{ (this.user.id)? 'Editar': 'Adicionar' }} Carteira
          </h2>
      </v-card-title>      
      <v-card-text class="mt-10 form-modal">        
        <v-text-field          
          v-model="user.nome"
          :rules="[rules.required]"             
          :error-messages="nomeError"
          @input="(val) => {payload.nome = val}"
          ref="inputNome"
          dense
          label="Nome"
          placeholder="Input Placeholder"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="user.sobrenome"
          :rules="[rules.required]"
          :error-messages="sobrenomeError"  
          @input="(val) => {payload.sobrenome = val}"        
          ref="inputSobrenome"
          dense
          label="Sobrenome"
          placeholder="Input Placeholder"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          :rules="[rules.required, rules.email]"
          :error-messages="emailError"
          @input="(val) => {payload.email = val}"
          ref="inputEmail"
          dense
          label="Email"
          placeholder="Input Placeholder"
          outlined
        ></v-text-field>
        <v-text-field          
          v-model="user.endereco_carteira"  
          :rules="[rules.required]"
          :error-messages="endereco_carteiraError"                  
          @input="(val) => {payload.endereco_carteira = val}"
          ref="inputEnderecoCarteira"
          dense
          label="Endereço da carteira"
          placeholder="Input Placeholder"
          outlined
        ></v-text-field>
        <v-text-field          
          v-model="user.endereco"                    
          @input="(val) => {payload.endereco = val}"
          ref="inputEndereco"
          dense
          label="Endereço"
          placeholder="Input Placeholder"
          outlined
        ></v-text-field>
        <v-text-field          
          v-model="user.data_nascimento"                    
          @change="(val) => {payload.data_nascimento = convertDateFormat(val)}"
          :rules="[rules.required, rules.date]"
          ref="inputNascimento"
          dense
          label="Data de nascimento"
          placeholder="Input Placeholder"
          outlined
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
            v-model="user.valor_carteira"
              :rules="[rules.required, rules.number]"
              :error-messages="valorError"   
              @input="(val) => {payload.valor_carteira = val}"
              @change="(val)=>{ user.valor_currency = val * selectedCurrencyBid}"
              ref="inputValor"
              dense
              label="Valor de compra (BTC)"
              placeholder="Input Placeholder"
              outlined
              ></v-text-field>
          </v-col>            
          <v-col cols="6" id="conversion">
            <h2>{{ selectedCurrency + " - " + (user.valor_currency || "") }} </h2>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mt-5">
        <v-spacer></v-spacer>
        <v-btn depressed text  class="no-uppercase" color="primary" @click="cancel()">
              Cancelar 
        </v-btn>
        <v-btn 
          class="no-uppercase pa-5"
          @click="submit()"
          color="primary"
          depressed  
        >
              {{ (this.user.id)? 'Editar': 'Adicionar' }}
        </v-btn>
        
      </v-card-actions>
    </v-card>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { validationRules } from '../../services/validation/rules'
import { convertDate } from '../../services/utils/dateTime'

export default {
  name:'user-form',
  components:{},  
  data: () => {
  return {
    payload: {},    
    rules: validationRules,
    nomeError: [],
    sobrenomeError: [],
    emailError: [],
    valorError: [],
    endereco_carteiraError:[],
    data_nascimentoError:[],
  }},
  methods:{
    ...mapMutations(['cleanModal']),
    ...mapActions(['postUser', 'putUser']),
    submit(){      
      if(this.validateForm()) {  
        this.payload.data_abertura = new Date().toISOString()
        if(this.user.id) {          
          this.putUser({...this.user, ...this.payload})
        }else{
          this.postUser(this.payload)
        }
        this.clean() 
        this.cleanModal()             
      }else{
        this.addErrorMsgs()        
      }
    },
    clean(){
      this.payload= {}
      this.resetValidation()
      this.removeErrorMsgs()      
    },
    cancel(){
      this.clean()
      this.cleanModal()
    },
    addErrorMsgs(){
      console.log('entrou')
      this.nomeError = this.$refs.inputNome.validate()? []: 'Required'      
      this.sobrenomeError = this.$refs.inputSobrenome.validate()? []: 'Required'
      this.emailError = this.$refs.inputEmail.validate()? []: 'Required'
      this.valorError = this.$refs.inputValor.validate()? []: 'Required'
      this.endereco_carteiraError = this.$refs.inputEnderecoCarteira.validate()? []: 'Required'
      this.data_nascimentoError = this.$refs.inputNascimento.validate()? []: 'Required'
    },
    validateForm(){
        return this.$refs.inputNome.valid &&
        this.$refs.inputSobrenome.valid &&
        this.$refs.inputEmail.valid &&
        this.$refs.inputValor.valid &&
        this.$refs.inputEnderecoCarteira.valid &&
        this.$refs.inputNascimento.valid;
    },
    resetValidation(){
      this.$refs.inputNome.resetValidation();      
      this.$refs.inputSobrenome.resetValidation();      
      this.$refs.inputEmail.resetValidation();      
      this.$refs.inputValor.resetValidation();        
      this.$refs.inputEnderecoCarteira.resetValidation();        
      this.$refs.inputNascimento.resetValidation();        
    },
    removeErrorMsgs(){
      this.nomeError = []
      this.sobrenomeError = []
      this.emailError = []
      this.valorError = []
      this.endereco_carteiraError = []
      this.data_nascimentoError = []
    },
    convertDateFormat(e) {
      return convertDate(e)
    }
  },   
  watch:{
    modal(val){
      if(val == 'addUser'){
      this.clean()
      }
    }
  },
  computed:{
    ...mapState({
      user: state => state.selectedUser,
      modal: state => { 
        return state.openedModal
      },
      selectedCurrency: state => state.selectedCurrency,
      selectedCurrencyBid: state => state.selectedCurrencyBid,
    })    
  }, 


}
</script>
<style lang="scss" scoped>
#conversion h2 {
  margin-top: -5px
}
</style>