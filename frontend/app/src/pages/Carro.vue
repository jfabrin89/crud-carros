<template>
  <div id="carro">
    <Cabecalho />
    <v-content app>
      <v-container fluid>
        <v-data-table :headers="tbl.carro.headers" :items="tbl.carro.body" :search="busca" sort-by="id" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-container>
                <v-row class="d-flex flex-row justify-start align-center">
                  <div cols="12" sm="4">
                    <v-toolbar-title>Carro</v-toolbar-title>
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
                  <v-btn color="primary" dark class="mb-2" v-on="on">Novo Carro</v-btn>
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
                          <v-text-field v-model.lazy="editedItem.valor" label="Valor" v-money="money"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                          <v-text-field v-model="editedItem.marcaId" label="Marca" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="7" md="7">
                          <v-text-field v-model="editedItem.marcaDescricao" label="Descrição" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                          <v-btn text icon @click="marca"><v-icon>search</v-icon></v-btn>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                          <v-text-field v-model="editedItem.lojaId" label="Loja" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="7" md="7">
                          <v-text-field v-model="editedItem.lojaDescricao" label="Descrição" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                          <v-btn text icon @click="loja"><v-icon>search</v-icon></v-btn>
                        </v-col>
                        
                        <v-col cols="12" sm="12" md="12">
                          <v-select :items="cbb.situacao" v-model="editedItem.situacao" label="Situação"></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="gray darken-3" text @click="close">Cancelar</v-btn>
                    <v-btn color="success darken-1" text @click="save">Salvar</v-btn>
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
    <Listagem :tipo="tipo" :dialog="lista.listagem" :listTitle="lista.title" :items="lista.items" v-on:listagem="closeListagem" v-on:retorno="selecionar"/>
  </div>
</template>

<script>
import Cabecalho from '@/components/Cabecalho'
import Mensagem from '@/components/Mensagem'
import Listagem from '@/components/Listagem'
import { VMoney } from 'v-money'

export default {
  data: () => ({
    busca: '',
    cbb: {
      situacao: [
        { text: 'Ativo', value: 'A' },
        { text: 'Inativo', value: 'I' }
      ]
    },
    dialog: false,
    defaultItem: {
      id: '',
      nome: '',
      valor: 0.00,
      marcaId: '',
      marcaDescricao: '',
      lojaId: '',
      lojaDescricao: '',
      situacao: 'A'
    },
    editedIndex: -1,
    editedItem: {
      id: '',
      nome: '',
      valor: 0.00,
      marcaId: '',
      marcaDescricao: '',
      lojaId: '',
      lojaDescricao: '',
      situacao: ''
    },
    lista: {
      title: '',
      items: '',
      listagem: false
    },
    mensagem: {
      snackbar: false,
      text: '',
      cor: ''
    },
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: true
    },
    tbl: {
      carro: {
        headers: [
          { text: '#', align: 'left', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Opções', value: 'action', sortable: false },
        ],
        body: [],
      },
      loja: {
        headers: [
          { text: '#', align: 'left', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Endereço', value: 'endereco' },
          { text: 'Opções', value: 'action', sortable: false },
        ],
        body: []
      },
      marca: {
        headers: [
          { text: '#', align: 'left', value: 'id' },
          { text: 'Nome', value: 'nome' },
          { text: 'Opções', value: 'action', sortable: false },
        ],
        body: []
      }
    },
    tipo: ''
  }),
  components: {
    Cabecalho,
    Mensagem,
    Listagem
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Carro' : 'Editar Carro'
    },
  },
  directives: {
    money: VMoney
  },
  created () {
    this.initialize()
    this.buscarLoja()
    this.buscarMarca()
  },
  methods: {
    ajustarValor (valor) {
      if (!valor) valor = this.editedItem.valor
      valor = valor.replace('R$', '')
      valor = valor.replace('.', '')
      valor = valor.replace(',', '.')
      valor = parseFloat(valor)
      return valor
    },
    buscarLoja () {
      this
        .axios
        .get('loja')
        .then(dados => {
          this.tbl.loja.body = dados.data.data
        })
    },
    buscarMarca () {
      this
        .axios
        .get('marca')
        .then(dados => {
          this.tbl.marca.body = dados.data.data
        })
    },
    close () {
      this.dialog = false
    },
    closeListagem () {
      this.lista.listagem = false
      this.dialog = true
    },
    async deleteItem (item) {
      confirm('Deseja realmente excluir este item?') && (
        await this
          .axios
          .delete('carro/' + item.id)
          .then(response => {
            this.initialize()
            this.text = response.data.mensagem
            this.snackbar = true
          })
      )
    },
    editItem (item) {
      this.editedIndex = this.tbl.body.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    initialize () {
      this
        .axios
        .get('carro')
        .then(dados => {
          this.tbl.carro.body = dados.data.data
        })
    },
    loja () {
      this.tipo = 'loja'
      this.lista.title = 'Lista de Lojas'
      this.lista.items = this.tbl.loja
      this.lista.listagem = true
      this.close()
    },
    marca () {
      this.tipo = 'marca'
      this.lista.title = 'Lista de Marcas'
      this.lista.items = this.tbl.marca
      this.lista.listagem = true
      this.close()
    },
    async save () {
      if (this.editedIndex > -1) {
        await this
          .axios
          .put('carro/' + this.editedItem.id, this.editedItem)
          .then(response => {
            this.mensagem.text = response.data.mensagem
            this.mensagem.snackbar = true,
            this.mensagem.cor = 'success'
          })
      } else {
        await this
          .axios
          .post('carro', this.editedItem)
          .then(response => {
            this.mensagem.text = response.data.mensagem
            this.mensagem.snackbar = true,
            this.mensagem.cor = 'success'
          })
      }
      this.initialize()
      this.close()
    },
    selecionar (val) {
      if (this.tipo === 'marca') {
        this.editedItem.marcaId = val.id
        this.editedItem.marcaDescricao = val.nome
      } else if (this.tipo === 'loja') {
        this.editedItem.lojaId = val.id
        this.editedItem.lojaDescricao = val.nome
      }
    }
  },
  name: "carro",
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>

<style scoped>

</style>