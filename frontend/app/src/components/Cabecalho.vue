<template>
  <div id="cabecalho">
    <Menu :gavetaPrincipal="gaveta" />
    <v-app-bar color="black darkness-3" app dark elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-app-bar-nav-icon @click="gaveta = !gaveta"></v-app-bar-nav-icon>
      <v-toolbar-title>Crud Carros</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  components: {
    Menu
  },
  data: () => ({
    gaveta: true
  }),
  name: "cabecalho"
}
</script>

<style scoped>
  
</style>