<template>
  <v-app>
    <default-bar />

    <default-view />
    <default-snake-bars v-if="error" :error="error"/>
  </v-app>
</template>

<script>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import DefaultSnakeBars from './snakeBars.vue';

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  components: {
    DefaultBar,
    DefaultView,
    DefaultSnakeBars
  }
}
</script>
