<template>
  <div class="container-table">
    <table>
      <thead>
        <tr class="heading">
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <select v-model="access" class="coin">
            <option value="valor_carteira">Bitcoin</option>
            <option value="brl" selected>BRL</option>
          </select>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="name">
            {{ user.nome }}
          </td>
          <td data-label="sobrenome">
            {{ user.sobrenome }}
          </td>
          <td data-label="email">{{ user.email }}</td>
          <td data-label="carteira">
            {{
              access === "valor_carteira"
                ? `BTC ${user.valor_carteira}`
                : `R$ ${user.valor_carteira * refsBitcoin.brl}`
            }}
          </td>
          <td data-label="ações" class="actions">
            <div class="container-icon" @click="$emit('updateUser', user.id)">
              <font-awesome-icon icon="fa-pencil" class="icon" />
            </div>
            <div class="container-icon" @click="$emit('deleteUser', user.id)">
              <font-awesome-icon icon="fa-trash" class="icon" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Table",
  props: {
    users: { type: Array, default: () => [], required: true },
  },
  data: () => ({
    access: "valor_carteira",
  }),
  computed: {
    ...mapGetters("GLOBAL", ["refsBitcoin"]),
  },
};
</script>
<style scoped>
.container-table {
  display: grid;
  height: 756px;
  margin: 20px;
  max-width: 100%;
  place-items: start;
  width: 100%;
}
table {
  border-collapse: collapse;
  border-bottom: 2px solid silver;
  width: 100%;
  user-select: text;
}
thead {
  display: none;
}
tr {
  display: block;
  margin: 8px 0;
  border-radius: 4px;
  border-left: 2px solid transparent;
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
tr:nth-child(even) {
  background: rgb(243, 243, 243);
}
tr:hover {
  border-left-color: #0069d9;
  background: #e3e4ef;
}
.heading:hover {
  border-left-color: transparent;
}
th {
  box-sizing: border-box;
  position: sticky;
  top: 0;
  padding: 8px 16px;
  background-color: #fff;
  text-align: initial;
}
th::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-bottom: 1px solid silver;
}
td:not([class]) {
  display: flex;
  padding: 8px 16px;
}
td[data-label]::before {
  content: attr(data-label);
  margin-right: auto;
  color: rgba(0, 0, 0, 0.6);
}
.name {
  display: flex;
  align-items: center;
  padding: 8px;
}
.coin {
  width: 100%;
  height: 34px;
  outline: none;
  border-color: transparent;
  border-bottom-color: silver;
  padding-left: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}
option {
  background: #eee;
}
.container-icon {
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  height: 30px;
  place-items: center;
  position: relative;
  transition: all 0.3s ease;
  width: 30px;
}
.container-icon::before {
  border-bottom: 5px solid rgba(0, 0, 0, 0.7);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  content: "";
  display: none;
  height: 0;
  position: absolute;
  top: 104%;
  width: 0;
}
.container-icon::after {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  color: #fff;
  content: "Tooltip black";
  display: none;
  font-size: 0.7rem;
  padding: 10px 5px;
  position: absolute;
  text-align: center;
  top: 120%;
  width: 70px;
}
.container-icon:hover {
  background: silver;
}
.container-icon:hover::after,
.container-icon:hover::before {
  display: block;
}
.icon {
  font-size: 0.9rem;
}
@media (min-width: 1200px) {
  thead {
    display: table-header-group;
  }
  tr {
    border-radius: initial;
    box-shadow: none;
    display: table-row;
    margin: 0;
  }
  td:not([class]) {
    display: table-cell;
    padding: 20px 16px;
  }
  td[data-label]::before {
    content: none;
  }
  .name {
    display: table-cell;
    padding: 8px 16px;
    width: 180px;
  }
  td[data-label="sobrenome"] {
    width: 250px;
  }
  td[data-label="email"] {
    width: 450px;
  }
  td[data-label="carteira"] {
    width: 250px;
  }
  .actions {
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 21px 5px;
  }
}
@media (max-width: 1200px) {
  .container-table {
    height: auto;
  }
  .name {
    font-size: 1.25rem;
  }
  .actions {
    display: flex;
    padding: 8px 16px;
  }
}
</style>
