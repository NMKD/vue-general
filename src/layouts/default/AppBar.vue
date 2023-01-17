<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Ad application</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tabs class="hidden-md-and-down">
      <v-tab v-for="item in items" :key="item.id" :to="item.url">
        <v-btn variant="text" :icon="item.icon"></v-btn>
        {{ item.title }}
      </v-tab>
    </v-tabs>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list v-for="item in items" :key="item.title" density="compact" nav>
      <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.value" :to="item.url" link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>


</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        {
          title: 'Home',
          value: 'home',
          icon: 'mdi-home',
          url: '/'
        },
        {
          title: 'Orders',
          value: 'orders',
          icon: 'mdi-bookmark',
          url: '/orders'
        },
        {
          title: 'New add',
          value: 'new-add',
          icon: 'mdi-bookmark-plus',
          url: '/new'
        },
        {
          title: 'My ads',
          value: 'list',
          icon: 'mdi-format-list-checkbox',
          url: '/list'
        },
        {
          title: 'Login',
          value: 'login',
          icon: 'mdi-lock',
          url: '/login'
        },
        {
          title: 'Registration',
          value: 'registration',
          icon: 'mdi-account-alert',
          url: '/registration'
        },
        {
          title: 'Account',
          value: 'account',
          icon: 'mdi-account',
          url: '/account'
        },

      ],
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
