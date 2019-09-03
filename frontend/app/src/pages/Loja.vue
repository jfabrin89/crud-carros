<template>
  <div id="home">
    <Cabecalho />
    <v-content app>
      <v-container fluid>
        <v-data-table :headers="tbl.headers" :items="tbl.body" :search="busca" sort-by="id" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-container>
                <v-row class="d-flex flex-row justify-start align-center">
                  <div cols="12" sm="4">
                    <v-toolbar-title>Loja</v-toolbar-title>
                  </div>
                  <v-divider class="ma-5" inset vertical></v-divider>
                  <div cols="12" sm="8" class="flex-grow-1 pt-5 mr-12">
                    <v-text-field v-model="busca" placeholder="Digite aqui sua busca" clearable></v-text-field>
                  </div>
                </v-row>
              </v-container>

              <!-- Modal de editar -->
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">Nova Loja</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="editedItem.nome" label="Nome"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="editedItem.endereco" label="Endereço"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-select :items="cbb.situacao" v-model="editedItem.situacao" label="Situação"></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item)">delete</v-icon>
          </template>
        </v-data-table>
      </v-container>
    </v-content>

    <Mensagem :snackbar="mensagem.snackbar" :texto="mensagem.text" :cor="mensagem.cor" />
  </div>
</template>

<script>
import Cabecalho from '@/components/Cabecalho'
import Mensagem from '@/components/Mensagem'
export default {
  components: {
    Cabecalho,
    Mensagem
  },
  data: () => ({
    busca: '',
    cbb: {
      situacao: [
        { text: 'Ativo', value: 'A' },
        { text: 'Inativo', value: 'I' }
      ]
    },
    dialog: false,
    tbl: {
      headers: [
        { text: '#', align: 'left', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Endereco', value: 'endereco' },
        { text: 'Opções', value: 'action', sortable: false },
      ],
      body: [],
    },
    editedIndex: -1,
    editedItem: {
      id: '',
      nome: '',
      endereco: '',
      situacao: ''
    },
    defaultItem: {
      id: '',
      nome: '',
      endereco: '',
      situacao: 'A'
    },
    mensagem: {
      snackbar: false,
      text: '',
      cor: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Loja' : 'Editar Loja'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this
        .axios
        .get('loja')
        .then(dados => {
          this.tbl.body = dados.data.data
        })
    },
    editItem (item) {
      this.editedIndex = this.tbl.body.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      confirm('Deseja realmente excluir este item?') && (
        await this
          .axios
          .delete('loja/' + item.id)
          .then(response => {
            this.initialize()
            this.mensagem.text = response.data.mensagem
            this.mensagem.snackbar = true,
            this.mensagem.cor = 'success'
          })
      )
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    async save () {
      if (this.editedIndex > -1) {
        await this
          .axios
          .put('loja/' + this.editedItem.id, this.editedItem)
          .then(response => {
            this.mensagem.text = response.data.mensagem
            this.mensagem.snackbar = true,
            this.mensagem.cor = 'success'
          })
      } else {
        await this
          .axios
          .post('loja', this.editedItem)
          .then(response => {
            this.mensagem.text = response.data.mensagem
            this.mensagem.snackbar = true,
            this.mensagem.cor = 'success'
          })
      }
      this.initialize()
      this.close()
    }
  },
  name: "loja"
}
</script>

<style scoped>

</style>