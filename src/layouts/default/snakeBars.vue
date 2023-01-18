<template>
  <v-snackbar v-model="snackbar" multi-line>

    {{ error }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="closeError">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      snackbar: true
    }
  },
  methods: {
    closeError() {
      this.snackbar = false
      this.$store.dispatch('clearError')
    }
  }
}
</script>
