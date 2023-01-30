<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Ad application</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tabs class="hidden-md-and-down">
      <v-tab v-for="item in links" :key="item.id" :to="item.url">
        <v-btn variant="text" :icon="item.icon"></v-btn>
        {{ item.title }}
      </v-tab>
      <v-tab v-if="isUserSingIn">
        <v-btn variant="text" icon="mdi-account-arrow-right" @click="logout"></v-btn>
        Logout
      </v-tab>
    </v-tabs>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list v-for="item in links" :key="item.title" density="compact" nav>
      <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.value" :to="item.url" link>
      </v-list-item>
    </v-list>
    <v-list v-if="isUserSingIn" nav>
      <v-list-item prepend-icon="mdi-account-arrow-right" title="Logout" value="logout" @click="logout" link>
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
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  computed: {
    isUserSingIn() {
      return this.$store.getters.isUserSingIn
    },
    links() {
      return this.isAuthLinks()
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    },
    isAuthLinks() {
      if (this.isUserSingIn) {
        return [
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
        ]
      } else {
        return [
          {
            title: 'Login',
            value: 'login',
            icon: 'mdi-lock',
            url: '/login'
          },
          {
            title: 'Registration',
            value: 'registration',
            icon: 'mdi-register-outline',
            url: '/registration'
          },
        ]
      }
    }
  }
}
</script>
