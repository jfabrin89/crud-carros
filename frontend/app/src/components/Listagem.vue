<template>
  <div id="listagem">
    <v-dialog v-model="dialog" max-width="70%">
      <v-card>
        <v-card-text>
          <v-data-table :headers="items.headers" :items="items.body" sort-by="id" :search="buscar">
            <template v-slot:top>
              <v-container>
                <v-row class="d-flex flex-row justify-start align-center">
                  <div cols="12" sm="4">
                    <v-toolbar-title>{{ listTitle }}</v-toolbar-title>
                  </div>
                  <v-divider class="ma-5" inset vertical></v-divider>
                  <div cols="12" sm="8" class="flex-grow-1 pt-5 mr-12">
                    <v-text-field v-model="buscar" placeholder="Digite aqui sua busca" clearable></v-text-field>
                  </div>
                </v-row>
              </v-container>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="selecionar(item)">check</v-icon>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="gray darken-3" text @click="close">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buscar: ''
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.$emit('listagem', true)
    },
    selecionar (item) {
      this.$emit('listagem', true)
      this.$emit('retorno', item)
    }
  },
  name: 'listagem',
  props: [
    'tipo',
    'listTitle',
    'items',
    'dialog'
  ]
}
</script>

<style>
  
</style>