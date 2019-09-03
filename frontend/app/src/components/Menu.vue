<template>
  <div id="menu">
    <v-navigation-drawer v-model="gavetaPrincipal" expand-on-hover app>
      <v-list-item height="50">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/lego/6.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="mb-1">Pablo Hernanes</v-list-item-title>
          <v-list-item-subtitle class="caption">Administrador</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link @click="$router.push(item.link)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Pagina Inicial', icon: 'mdi-home', link: 'home' },
      { title: 'Loja', icon: 'mdi-domain', link: 'loja' },
      { title: 'Marca', icon: 'mdi-alpha-m-circle', link: 'marca' },
      { title: 'Carro', icon: 'mdi-car', link: 'carro' },
      { title: 'Usuário', icon: 'mdi-account', link: 'usuario' }
    ],
    menu: false
  }),
  name: "menu",
  props: [
    'gavetaPrincipal',
  ]
}
</script>

<style scoped>
  
</style>