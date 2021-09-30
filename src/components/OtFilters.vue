<template>
  <section class="container">
    <h1>Filtros</h1>

    <div class="filters-container">
      <div>
        <label class="mb-2" for="name">Nome</label>
        <b-form-input
          id="name"
          type="text"
          placeholder="Maria silva"
          v-model.trim="userName"
        />
      </div>

      <div>
        <label class="mb-2" for="email">Email</label>
        <b-form-input
          id="email"
          type="email"
          placeholder="email@email.com"
          v-model.trim="userEmail"
        />
      </div>

      <div>
        <label class="mb-2" for="date">Data de criação</label>
        <b-form-input id="date" type="date" v-model="creationDate" />
      </div>

      <b-btn class="search-btn" size="md">Pesquisar</b-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: "OtFilters",

  data() {
    return {
      userName: "",
      userEmail: "",
      creationDate: ""
    };
  }
};
</script>

<style scoped>
section {
  padding: 25px;
  background-color: white;
  border-radius: 5px;
}

h1 {
  font-size: 1.25rem;
  font-weight: normal;
}

.filters-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 90px;
  gap: 30px;
}

.search-btn {
  justify-self: end;
  align-self: end;
}

@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
}
</style>
