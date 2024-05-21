
import Vue from "vue";

export const globalVariables = Vue.observable ({
    usersData: [],
    currentPage: 1,
    itemsPerPage: 10,
    filteredUsers: [],
    editModalIsOpen: false,
    addModalIsOpen: false,
    bidBitcoin: 0,
    askBitcoin: 0,
    id:0,
    editUser: {
        id:'',
        nome: '',
        sobrenome:'',
        endereco:'',
        data_nascimento:'',
        data_abertura: '',
        email: '',
        valorReais:''
    },  


    filter: {
        nome: '',
        sobrenome: '',
        email: ''
    }
});