
<template>
  <div class="table__container">
    <div class="table-title__container">
      <h3>Carteiras</h3>
      <button class="export__button" @click="exportarCSV">Exportar CSV</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Bitcoin</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in usersFiltrados" :key="index">
          <td class="infos__container">{{ user.nome }}</td>
          <td class="infos__container">{{ user.sobrenome }}</td>
          <td class="infos__container">{{ user.email }}</td>
          <td class="infos__container">{{ user.valor_carteira }}</td>
          <td class="buttons__container">
            <button class="icon__button" @click="editUser(user.id)">
              <img class="icon" src="../../assets/img/icons/pencil_icon.png" alt="Editar">
            </button>
            
            <button class="icon__button" @click="removeUser(user.id)">
              <img class="icon" src="../../assets/img/icons/trash_icon.png" alt="Deletar">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="pagination__container">
       <button @click="paginaAnterior" :disabled="paginadestacada === 1" class="pagenation__buton"><img class="pagenation__icon" src="../../assets/img/icons/leftarrow_icon.png" alt="Anterior"></button>
       <button class="pagenation__buton" v-for="pagina in numeroDePaginas" :key="pagina"
        @click="irParaPagina(pagina)"
        :class="{ 'pagina-atual': pagina === paginadestacada }">
        {{ pagina }}
</button>
       <button @click="proximaPagina" :disabled="paginadestacada === numeroDePaginas" class="pagenation__buton"><img class="pagenation__icon" src="../../assets/img/icons/rightarrow_icon.png" alt="Próximo"></button>
      </div>
    </div>
  </div>
</template>
  
<script src="./UsersTableScript.js"></script>

<style src="./UsersTableStyle.css" scoped></style>
  