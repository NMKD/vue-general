<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Ad edit card
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field v-model="title" :rules="[v => !!v || 'Title is required']" class="mb-2" name="title" type="text"
          label="Title" placeholder="Enter title for ad" color="primary" variant="underlined" required>
        </v-text-field>

        <v-textarea v-model="description" counter :rules="[v => v.length <= 250 || 'Max 250 characters']" class="mb-2"
          name="description" type="text" label="Ad description" color="primary" variant="underlined" clearable required>
        </v-textarea>

        <p class="my-10 text-red-accent-2">
          {{ errors }}
        </p>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="onSave">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data() {
    return {
      dialog: false,
      title: this.ad.title,
      description: this.ad.description,
      errors: ''
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
  methods: {
    async onSave() {
      if (this.title === '' || this.description === '') {
        await this.$store.dispatch('setError', 'Please edit or return the old values')
        this.errors = this.$store.getters.error
      } else {
        await this.$store.dispatch('updateAd', {
          title: this.title,
          description: this.description,
          uid: this.ad.uid
        })
        this.dialog = false
      }
    }
  }
}
</script>
