<template>
  <div>
    <div class="container container-flex-center-between m-b-2">
      <App-Title> BTC Carteiras </App-Title>
      <App-Button variation="primary" @click="openModalRegister">
        Adicionar Carteira
      </App-Button>
    </div>
    <App-FormSearch />
    <main class="container">
      <article class="card">
        <section>
          <div class="container-flex-center-between header-table">
            <App-Title level="h4"> Carteiras </App-Title>

            <download-csv :data="wallets" name="wallets.csv">
              <App-Button
                class="container-flex-center-between"
                variation="secondary"
              >
                Exportar CSV
              </App-Button>
            </download-csv>
          </div>
          <App-TableWallets :wallets="wallets" />
        </section>
      </article>
      <div class="table-info container-flex-center-between">
        <div class="totalRecord">{{ totalRecords }} Registro(s)</div>

        <App-Pagination
          :paginaAtual="paginaAtual"
          :total="totalRecords"
          @change-page="update"
        />
      </div>
    </main>
  </div>
</template>

<script>
import ModalService from "@/services/ModalService";
import ModalRegister from "@/layouts/ModalRegister.vue";

export default {
  name: "App-Home",
  data: () => {
    return {
      wallets: [
        {
          id: 1,
          nome: "Doroteya",
          sobrenome: "Powder",
          email: "dpowder0@wisc.edu",
          endereco: "6906 Merchant Center",
          data_nascimento: "1996-01-03T14:28:31Z",
          data_abertura: "2018-05-16T15:50:23Z",
          valor_carteira: 3.83526236,
          endereco_carteira: "1Q956unZUz1RHVtUrZbEZSXgu65RLMF5h3",
        },
        {
          id: 2,
          nome: "Shelden",
          sobrenome: "Dytham",
          email: "sdytham1@google.co.uk",
          endereco: "38 Dennis Parkway",
          data_nascimento: "1991-08-28T02:38:40Z",
          data_abertura: "2016-12-19T18:16:41Z",
          valor_carteira: 3.23194379,
          endereco_carteira: "1GVjkqz2uBAMQXSCeNKUu2ZSMsm21MXV9p",
        },
        {
          id: 3,
          nome: "Gray",
          sobrenome: "Epps",
          email: "gepps2@artisteer.com",
          endereco: "46062 Hagan Way",
          data_nascimento: "1987-11-03T10:13:46Z",
          data_abertura: "2017-12-26T10:04:03Z",
          valor_carteira: 3.51346218,
          endereco_carteira: "1FmTwq67tnVybmJCUxbAitp5XjAWeQS8PW",
        },
        {
          id: 4,
          nome: "Dael",
          sobrenome: "Tunder",
          email: "dtunder3@youku.com",
          endereco: "7 Vera Court",
          data_nascimento: "1983-09-20T19:50:22Z",
          data_abertura: "2018-04-20T00:25:53Z",
          valor_carteira: 0.64670558,
          endereco_carteira: "1HQ84PuJNsyoEZFMLcy5U4dQHYntHaV39Y",
        },
        {
          id: 5,
          nome: "Abbey",
          sobrenome: "Fairley",
          email: "afairley4@cnn.com",
          endereco: "7 Vahlen Street",
          data_nascimento: "1994-03-30T00:26:32Z",
          data_abertura: "2020-07-09T07:03:17Z",
          valor_carteira: 1.95851203,
          endereco_carteira: "1CHPiiAjWjS1wx2MBLSLCRA7jsdaoZUFPu",
        },
        {
          id: 6,
          nome: "Shoshanna",
          sobrenome: "Hennemann",
          email: "shennemann5@storify.com",
          endereco: "3 Talisman Point",
          data_nascimento: "2001-02-06T16:22:19Z",
          data_abertura: "2017-06-13T18:10:07Z",
          valor_carteira: 0.16271807,
          endereco_carteira: "1EZfdFNoFThrRQaPNZ63ckiMAAMGx23GEV",
        },
        {
          id: 7,
          nome: "Kris",
          sobrenome: "Cresswell",
          email: "kcresswell6@telegraph.co.uk",
          endereco: "4798 Buell Lane",
          data_nascimento: "1987-06-26T00:02:40Z",
          data_abertura: "2019-04-14T08:55:16Z",
          valor_carteira: 3.28863672,
          endereco_carteira: "1KtzVYvWjZDv8guMMX1GSrkxbLYg89fLhU",
        },
        {
          id: 8,
          nome: "Tudor",
          sobrenome: "Espy",
          email: "tespy7@ifeng.com",
          endereco: "48894 Spenser Circle",
          data_nascimento: "1983-03-27T13:49:03Z",
          data_abertura: "2017-12-17T06:25:37Z",
          valor_carteira: 2.95072841,
          endereco_carteira: "1CnqC8KeWwTbNJy53HtsC2KBqBnwKMhRzp",
        },
        {
          id: 9,
          nome: "Hewie",
          sobrenome: "Dawson",
          email: "hdawson8@devhub.com",
          endereco: "4 Roth Place",
          data_nascimento: "1991-01-07T05:52:38Z",
          data_abertura: "2017-03-21T07:41:57Z",
          valor_carteira: 1.5586261,
          endereco_carteira: "1Bg1q55FFbY2HarR75VHFUH9cGomCopWaR",
        },
        {
          id: 10,
          nome: "Lothario",
          sobrenome: "Calliss",
          email: "lcalliss9@vimeo.com",
          endereco: "29 Daystar Road",
          data_nascimento: "1981-01-01T01:18:19Z",
          data_abertura: "2021-07-02T14:17:22Z",
          valor_carteira: 0.18121175,
          endereco_carteira: "1AyxhRSMsA4bQ6Uh5AWZwupgpn3GbrXVJH",
        },
      ],
      totalRecords: 11,
      paginaAtual: 1,
    };
  },
  methods: {
    update: () => {
      return [];
    },
    openModalRegister(user) {
      ModalService.open(ModalRegister, {
        formulario: user,
      }).then((retorno) => {
        this.editar(retorno);
      });
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 0px;
}
.header-table {
  margin-bottom: 2rem;
}
.table-info {
  border-top: 1px solid #f2f2f2;
  background-color: #fff;
  padding: 1rem;
  color: var(--color-default);
  margin-bottom: 1.3rem;
  border-radius: 0 0 0.25rem 0.25rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}
.totalRecord {
  font-size: var(--size-s);
}
</style>
