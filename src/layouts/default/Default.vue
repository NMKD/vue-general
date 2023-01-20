<template>
  <v-app>
    <default-bar />

    <default-view />
  </v-app>
</template>

<script>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'

export default {
  components: {
    DefaultBar,
    DefaultView
  },
  // mounted() {
  //   this.$store.dispatch('authActions')
  // }
}
</script>
