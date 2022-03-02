<template>
  <div class="container">
    <div class="wallet">
      <h3>Carteiras</h3>
      <button>Exportar CSV</button>
    </div>

    <div class="table-wallet">
      <table>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Bitcoin</th>
          <th></th>
        </tr>
        <hr />
        <tr>
          <td>Alfreds</td>
          <td>Futterkiste</td>
          <td>email@gmail.com</td>
          <td>0,008000</td>
          <td class="icons">
            <i class="fas fa-pencil-alt"></i>
            <i class="fas fa-trash-alt"></i>
          </td>
        </tr>
      </table>

      <div class="records">
        <div class="div-records">
          <p>30 Registo(s)</p>
        </div>
        <div class="pages">
          <i class="fas fa-angle-left"></i>
          <p class="paragraph-one">1</p>
          <p>2</p>
          <p>3</p>
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Wallet",
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios
        .get("http://localhost:3004/users")
        .then((res) => {
          this.user = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding-left: 10px;
  padding-right: 10px;
  background: #ffffff;
  border-radius: 10px;
  height: 100%;
}

.wallet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px;
  width: 80%;
  margin: 20px auto;
}

.wallet button {
  width: 180px;
  height: 50px;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 8px;
  cursor: pointer;
  background: #ffffff;

  font-size: 16px;
  font-weight: bold;
}

.wallet button:hover {
  opacity: 0.8;
}

.wallet button:active {
  opacity: 0.5;
}

.table-wallet {
  width: 80%;
  margin: auto;
}

table {
  display: flex;
  flex-direction: column;
}

tr {
  display: flex;
  justify-content: space-between;
}

.icons {
  display: flex;
  gap: 10px;
}

.records {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px auto;
  color: #767676;
}

.div-records {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}

.pages {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.pages p {
  border: 1px solid #e5e5e5;
  padding: 2px;
  font-size: 15px;
}

.paragraph-one {
  border: none;
  background: #007aff;
  color: #ffffff;
}
</style>
