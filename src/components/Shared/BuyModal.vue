<template>
  <v-dialog style="width: 50%" v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn variant="flat" color="success" v-bind="props">
        Buy
      </v-btn>
    </template>
    <v-card class="px-5 py-5">

      <v-card-title class="text-h5">
        Buy Car
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-text-field v-model="name" :rules="[v => !!v || 'Name is required']" class="mb-2" name="name" type="text"
          label="Your name" placeholder="Enter your name" color="primary" variant="underlined" required>
        </v-text-field>
        <v-text-field v-model="phone" :rules="[v => !!v || 'Name is required']" class="mb-2" name="phone" type="text"
          label="Your phone" placeholder="+7(___)______" color="primary" variant="underlined" required>
        </v-text-field>

        <p v-show="errors" class="my-10 text-red-accent-2">
          {{ errors }}
        </p>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" color="green-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
        <v-btn :disabled="loading" :loading="loading" variant="flat" color="green-darken-1" @click="onSave">
          Buy
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
      errors: '',
      name: '',
      phone: '',
      loading: false,
      done: false
    }
  },
  methods: {
    async onSave() {
      if (this.name === '' || this.phone === '') {
        await this.$store.dispatch('setError', 'Please enter values in inpunts')
        this.errors = this.$store.getters.error
      } else {
        this.loading = true
        await this.$store.dispatch('createOrders', {
          name: this.name,
          phone: this.phone,
          key: this.ad.key,
          uid: this.ad.uid,
          done: this.done
        })
        this.name = ''
        this.phone = ''
        this.loading = false
        this.dialog = false
      }
    }
  }
}
</script>
