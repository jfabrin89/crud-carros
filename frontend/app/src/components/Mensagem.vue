<template>
  <div id="mensagem">
    <v-snackbar v-model="snackbar" :multi-line="false">
        {{ texto }}
        <v-btn :color="cor" text @click="snackbar = false"> Confirmar </v-btn>
    </v-snackbar>    
  </div>
</template>

<script>
export default {
  name: 'mensagem',
  props: [
    'snackbar',
    'texto',
    'cor'
  ]
}
</script>

<style>
  
</style>