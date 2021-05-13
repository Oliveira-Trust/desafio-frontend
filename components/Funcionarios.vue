<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="funcs"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1">Funcionários</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Novo Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.sobrenome"
                        label="Sobrenome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.cargo"
                        label="Cargo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.setor"
                        label="Setor"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.tempo"
                        label="Tempo na empresa"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Apaga item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small color="info" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Sem registros </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import funcionarios from '@/assets/data'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome',
      },
      { text: 'Sobrenome', value: 'sobrenome' },
      { text: 'Cargo', value: 'cargo' },
      { text: 'Setor', value: 'setor' },
      { text: 'Tempo na Empresa', value: 'tempo' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    funcs: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      sobrenome: '',

      cargo: '',
      setor: '',
      tempo: 0,
    },
    defaultItem: {
      nome: '',
      sobrenome: '',
      cargo: '',
      setor: '',
      tempo: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  mounted() {
    this.funcs = [...funcionarios]
  },

  methods: {
    initialize() {
      this.funcs = []
    },

    editItem(item) {
      this.editedIndex = this.funcs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.funcs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.funcs.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.funcs[this.editedIndex], this.editedItem)
      } else {
        this.funcs.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
<style></style>
