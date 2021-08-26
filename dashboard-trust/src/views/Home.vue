<template>
  <div class="home">
    <Header />
    <Banner />
    <main class="conteudo pb-5 mb-5">
      <b-container>
        <b-row>
          <b-col>
            <transition name="fade-titulo" mode="out-in" appear>
              <h1 class="titulo">
                Bem vindo! <br />
                <small>Veja o balanço atual:</small>
              </h1>
            </transition>
          </b-col>
        </b-row>

        <!-- dashboard -->
        <transition name="fade-dash" mode="out-in" appear>
          <b-row tag="section" class="dashboard">
            <b-col lg="4" class="mb-4 mb-lg-0">
              <div
                class="infos d-flex justify-content-center align-items-center rounded-lg shadow-lg"
              >
                <div>
                  <h3 class="m-0 p-0">{{ funcionarios.length }}</h3>
                  <p>Funcionários</p>
                </div>
              </div>
            </b-col>
            <b-col lg="4" class="mb-4 mb-lg-0">
              <div
                class="infos d-flex justify-content-center align-items-center rounded-lg shadow-lg"
              >
                <div>
                  <h3 class="m-0 p-0">{{ mostrarQtdCargos }}</h3>
                  <p>Cargos</p>
                </div>
              </div>
            </b-col>
            <b-col lg="4">
              <div
                class="infos d-flex justify-content-center align-items-center rounded-lg shadow-lg"
              >
                <div>
                  <h3 class="m-0 p-0">{{ mostrarQtdSetores }}</h3>
                  <p>Setores</p>
                </div>
              </div>
            </b-col>
          </b-row>
        </transition>
      </b-container>

      <!-- Adicionar Funcionário -->
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
              >{{ textoBotaoNovoFuncionario }}
              <b-icon
                v-if="!mostrarForm"
                icon="plus-circle"
                class="ml-2"
              ></b-icon>
              <b-icon v-else icon="arrow-up-circle" class="ml-2"></b-icon
            ></router-link>
          </b-col>
        </b-row>

        <div id="formulario"></div>
        <transition name="fade-form" mode="out-in">
          <b-form class="formulario" v-show="mostrarForm" :validated="true">
            <b-row tag="section">
              <b-col lg="3">
                <b-form-group label="Nome completo:">
                  <b-form-input
                    v-model="novoUsuario.nome_completo"
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
                    required
                    v-model="novoUsuario.cargo"
                    :options="cargos.options"
                  >
                    <template #first>
                      <b-form-select-option :value="null" disabled
                        >Escolha o cargo</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group label="Setor:">
                  <b-form-select
                    required
                    v-model="novoUsuario.setor"
                    :options="setores.options"
                  >
                    <template #first>
                      <b-form-select-option :value="null" disabled
                        >Escolha o setor</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Data de admissão:">
                  <b-form-datepicker
                    required
                    id="example-datepicker"
                    v-model="novoUsuario.tempo"
                    locale="pt"
                    :close-button="false"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }"
                    close-button-variant="danger"
                    :dark="false"
                    :hide-header="true"
                    label-help="Use as setas do teclado para controlar"
                    label-close-button="fechar calendário"
                    label-next-month="próximo mês"
                    label-prev-month="mês anterior"
                    label-next-year="próximo ano"
                    label-prev-year="ano anterior"
                    label-no-date-selected="Selecione uma data"
                    selected-variant="danger"
                    nav-button-variant="dark"
                    :max="new Date()"
                    class="mb-2"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-button
                  @click.prevent="enviarFuncionario"
                  class="w-100 botao-adicionar mb-5 mb-lg-0"
                  type="submit"
                  variant="success"
                  :disabled="liberarBotao"
                  >Adicionar</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </transition>
      </b-container>

      <!-- Lista de Funcionários -->
      <b-container class="funcionarios">
        <b-row v-if="funcionarios.length">
          <b-col>
            <transition-group name="fade" mode="out-in">
              <div id="funcionarios-lista" key="funcionario">
                <b-row
                  class="item"
                  :per-page="itensPorPagina"
                  :current-page="paginaAtual"
                  v-for="funcionario in listaFuncionarios"
                  :key="funcionario.id"
                >
                  <b-col lg="3" class="d-flex align-items-center"
                    ><p class="p-0 m-0">
                      <span>Nome:</span>
                      {{ funcionario.nome_completo | NomeSobrenome }}
                    </p></b-col
                  >
                  <b-col lg="3" class="d-flex align-items-center"
                    ><p class="p-0 m-0">
                      <span>Cargo:</span> {{ funcionario.cargo }}
                    </p></b-col
                  >
                  <b-col lg="2" class="d-flex align-items-center"
                    ><p class="p-0 m-0">
                      <span>Setor:</span> {{ funcionario.setor }}
                    </p></b-col
                  >
                  <b-col lg="2" class="d-flex align-items-center"
                    ><p class="p-0 m-0">
                      <span>Admissão:</span>
                      {{ funcionario.tempo | FormatandoData }}
                    </p></b-col
                  >

                  <b-col
                    lg="2"
                    class="d-flex align-items-center justify-content-end"
                  >
                    <b-button
                      v-if="funcionario.tem_arquivo"
                      class="mr-2"
                      size="sm"
                      variant="success"
                      v-b-tooltip.hover.top="'Tem 1 arquivo'"
                      ><b-icon icon="paperclip"></b-icon
                    ></b-button>

                    <b-button
                      @click="subirArquivo(funcionario)"
                      class="mr-2"
                      size="sm"
                      variant="warning"
                      ><b-icon icon="cloud-upload"></b-icon
                    ></b-button>

                    <b-button
                      @click="removerFuncionario(funcionario.id)"
                      size="sm"
                      variant="danger"
                      ><b-icon icon="trash"></b-icon
                    ></b-button>
                  </b-col>
                </b-row>
              </div>
              <b-pagination
                v-model="paginaAtual"
                :per-page="itensPorPagina"
                :total-rows="linhas"
                key="paginacao"
                aria-controls="funcionarios-lista"
                pills
                align="center"
                class="mt-5"
                first-text="Primeiro"
                prev-text="Voltar"
                next-text="Avançar"
                last-text="Último"
              ></b-pagination>
            </transition-group>
          </b-col>
        </b-row>

        <b-row v-else>
          <h6 class="text-center w-100">
            Não há funcionários cadastrados!
          </h6>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
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
      paginaAtual: 1,
      itensPorPagina: 5,
      funcionarios: [],
      cargos: {
        options: [],
      },
      setores: {
        options: [],
      },
      novoUsuario: {
        nome_completo: null,
        cargo: null,
        setor: null,
        tempo: null,
        tem_arquivo: false,
      },
    };
  },
  computed: {
    liberarBotao() {
      if (
        this.novoUsuario.nome_completo &&
        this.novoUsuario.cargo &&
        this.novoUsuario.setor &&
        this.novoUsuario.tempo
      ) {
        return false;
      } else {
        return true;
      }
    },
    mostrarQtdCargos() {
      return this.removerDuplicados(this.funcionarios, "cargo");
    },
    mostrarQtdSetores() {
      return this.removerDuplicados(this.funcionarios, "setor");
    },
    listaFuncionarios() {
      const items = this.funcionarios.slice().reverse();

      return items.slice(
        (this.paginaAtual - 1) * this.itensPorPagina,
        this.paginaAtual * this.itensPorPagina
      );
    },
    linhas() {
      return this.funcionarios.length;
    },
    textoBotaoNovoFuncionario() {
      return !this.mostrarForm ? "Novo Funcionário" : "Cancelar Adição";
    },
  },
  methods: {
    removerDuplicados(obj, chave) {
      let lista = new Set();

      obj.forEach((item) => {
        lista.add(item[`${chave}`]);
      });

      return [...lista.values()].length;
    },
    abrirForm() {
      let topSet = document.querySelector("#formulario").offsetTop;
      this.mostrarForm = !this.mostrarForm;

      if (this.mostrarForm) {
        window.scrollTo({ top: topSet, behavior: "smooth" });
      }
    },
    subirArquivo(funcionario) {
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
          // Apenas para exemplificar o contexto, nessa API Fake não da pra subir arquivos.
          axios
            .patch(`http://localhost:3004/funcionarios/${funcionario.id}`, {
              tem_arquivo: true,
            })
            .then(() => {
              this.listarFuncionarios();
              Swal.fire({
                icon: "success",
                title: "Arquivo enviado com sucesso",
                confirmButtonColor: "#28a745",
              });
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
    listarFuncionarios() {
      axios.get("http://localhost:3004/funcionarios").then((response) => {
        this.funcionarios = response.data;
      });
    },
    listarCargos() {
      axios.get("http://localhost:3004/cargos").then((response) => {
        let cargos = [];
        response.data.forEach((element) => {
          cargos.push({ value: element.value, text: element.value });
        });
        this.cargos.options = cargos;
      });
    },
    listarSetores() {
      axios.get("http://localhost:3004/setores").then((response) => {
        let setores = [];
        response.data.forEach((element) => {
          setores.push({ value: element.value, text: element.value });
        });
        this.setores.options = setores;
      });
    },
    enviarFuncionario() {
      axios
        .post("http://localhost:3004/funcionarios", this.novoUsuario)
        .then(() => {
          this.paginaAtual = 1;
          this.listarFuncionarios();
          this.novoUsuario.nome_completo = null;
          this.novoUsuario.cargo = null;
          this.novoUsuario.setor = null;
          this.novoUsuario.tempo = null;
          this.novoUsuario.tem_arquivo = false;
        })
        .catch((error) => {
          window.alert(error);
        });
    },
    removerFuncionario(id) {
      Swal.fire({
        icon: "question",
        title: "tem certeza que deseja excluir esse funcionário?",
        confirmButtonText: "sim",
        confirmButtonColor: "#dc3545",
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed)
          axios.delete(`http://localhost:3004/funcionarios/${id}`).then(() => {
            this.listarFuncionarios();
          });
      });
    },
  },
  created() {
    this.listarFuncionarios();
    this.listarSetores();
    this.listarCargos();

    if (window.localStorage.user) {
      this.$store.dispatch("manterLogado");
    }
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
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--dark);

    &:hover {
      text-decoration: none;
      color: var(--gamboge);
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

    &:nth-child(2n + 1) {
      background: var(--gray);
      color: var(--dark);
    }

    span {
      font-weight: 700;
    }
  }
}

.fade-move {
  transition: transform 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-form-enter-active,
.fade-form-leave-active {
  transition: all 0.3s;
}

.fade-form-enter,
.fade-form-leave-to {
  opacity: 0;
  transform: translate3d(0, -50px, 0);
}

.fade-dash-enter-active,
.fade-dash-leave-active {
  transition: all 1s;
}

.fade-dash-enter,
.fade-dash-leave-to {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
}
</style>
