<template>
  <div class="home">
    <Header />
    <Banner />
    <main class="conteudo pb-5 mb-5">
      <b-container>
        <b-row>
          <b-col>
            <h1 class="titulo">
              Bem vindo! <br />
              <small>Veja o balanço atual:</small>
            </h1>
          </b-col>
        </b-row>

        <b-row tag="section" class="dashboard">
          <b-col lg="4" class="mb-4 mb-lg-0">
            <div
              class="infos d-flex justify-content-center align-items-center rounded-lg shadow-lg"
            >
              <div>
                <h3 class="m-0 p-0">50</h3>
                <p>Funcionários</p>
              </div>
            </div>
          </b-col>
          <b-col lg="4" class="mb-4 mb-lg-0">
            <div
              class="infos d-flex justify-content-center align-items-center rounded-lg shadow-lg"
            >
              <div>
                <h3 class="m-0 p-0">12</h3>
                <p>Cargos</p>
              </div>
            </div>
          </b-col>
          <b-col lg="4">
            <div
              class="infos d-flex justify-content-center align-items-center rounded-lg shadow-lg"
            >
              <div>
                <h3 class="m-0 p-0">5</h3>
                <p>Setores</p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <b-container class="add-funcionario">
        <b-row tag="section" class="mb-4">
          <b-col md="8">
            <h4>Lista de Funcionários:</h4>
          </b-col>
          <b-col md="4" class="d-flex justify-content-end align-items-center">
            <router-link
              to="#formulario"
              class="add"
              @click.native="abrirForm()"
              >Novo Funcionário <b-icon icon="plus-circle" class="ml-2"></b-icon
            ></router-link>
          </b-col>
        </b-row>

        <div id="formulario"></div>
        <b-form class="formulario" v-show="mostrarForm">
          <b-row tag="section">
            <b-col lg="2">
              <b-form-group label="Nome completo:">
                <b-form-input
                  id="input-1"
                  type="text"
                  placeholder="Nome e Sobrenome"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2">
              <b-form-group label="Cargo:">
                <b-form-select
                  v-model="cargos.selected"
                  :options="cargos.options"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="2">
              <b-form-group label="Setor:">
                <b-form-select
                  v-model="setores.selected"
                  :options="setores.options"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group label="Data de admissão:">
                <b-form-datepicker
                  id="example-datepicker"
                  v-model="dataAdmissao"
                  class="mb-2"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col lg="2">
              <b-button
                class="w-100 botao-adicionar mb-5 mb-lg-0"
                type="submit"
                variant="success"
                >Adicionar</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-container>

      <b-container class="funcionarios">
        <b-row class="align-items-center">
          <b-col>
            <b-row class="item">
              <b-col lg="3" class="d-flex align-items-center"
                ><p class="p-0 m-0">
                  <span>Nome:</span> Marcelo Almeida
                </p></b-col
              >
              <b-col lg="3" class="d-flex align-items-center"
                ><p class="p-0 m-0">
                  <span>Cargo:</span> Diretor Executivo
                </p></b-col
              >
              <b-col lg="2" class="d-flex align-items-center"
                ><p class="p-0 m-0"><span>Setor:</span> Financeiro</p></b-col
              >
              <b-col lg="2" class="d-flex align-items-center"
                ><p class="p-0 m-0"><span>Tempo:</span> 2 anos</p></b-col
              >

              <b-col
                lg="2"
                class="d-flex align-items-center justify-content-end"
              >
                <b-button class="mr-2" size="sm" variant="success"
                  ><b-icon icon="paperclip"></b-icon
                ></b-button>

                <b-button
                  @click="subirArquivo()"
                  class="mr-2"
                  size="sm"
                  variant="warning"
                  ><b-icon icon="cloud-upload"></b-icon
                ></b-button>

                <b-button size="sm" variant="danger"
                  ><b-icon icon="trash"></b-icon
                ></b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

export default {
  name: "Home",
  components: {
    Header,
    Banner,
  },
  data() {
    return {
      mostrarForm: false,
      dataAdmissao: null,
      cargos: {
        selected: null,
        options: [
          { value: null, text: "Escolha o cargo" },
          { value: "Gerente de contas", text: "Gerente de contas" },
        ],
      },
      setores: {
        selected: null,
        options: [
          { value: null, text: "Escolha o setor" },
          { value: "Contabilidade", text: "Contabilidade" },
        ],
      },
    };
  },
  methods: {
    abrirForm() {
      let topSet = document.querySelector("#formulario").offsetTop;
      this.mostrarForm = !this.mostrarForm;

      if (this.mostrarForm) {
        window.scrollTo({ top: topSet, behavior: "smooth" });
      }
    },
    subirArquivo() {
      Swal.fire({
        icon: "question",
        title: "Selecione um arquivo",
        input: "file",
        confirmButtonText: "enviar arquivo",
        confirmButtonColor: "green",
        showDenyButton: false,
        showCloseButton: true,
        inputAttributes: {
          accept: "pdf/docx",
          "aria-label": "Envie o arquivo",
        },
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            icon: "success",
            title: "Arquivo enviado com sucesso",
            confirmButtonColor: "#28a745",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "insira um arquivo válido",
            confirmButtonColor: "#dc3545",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  .infos {
    background: var(--mahogany);
    height: 250px;
    color: var(--light);
    text-align: center;

    h3 {
      font-size: 5rem;
    }

    p {
      font-size: 1.25rem;
    }
  }
}

.add-funcionario {
  margin-top: 60px;

  h4 {
    font-weight: 700;
    font-size: 1.5rem;
  }

  .add {
    text-decoration: none;
    color: var(--dark);

    &:hover {
      text-decoration: none;
    }
  }

  .formulario {
    .botao-adicionar {
      margin-top: 10px;

      @media screen and (min-width: 992px) {
        margin-top: 31px;
      }
    }
  }
}

.funcionarios {
  .item {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    margin: 0;
    font-size: 0.9rem;

    &:nth-child(1n) {
      background: var(--gray);
      color: var(--light);
    }

    span {
      font-weight: 700;
    }
  }
}
</style>
