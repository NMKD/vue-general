<template>
  <v-container fluid>
    <v-row justify="center" align-content="center">
      <v-col cols="12" md="6" lg="6">
        <h1 class="my-10 text-center">Create new add</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="title" :rules="[v => !!v || 'Title is required']" class="mb-2" name="title" type="text"
            label="Title" placeholder="Enter title for ad" color="primary" variant="underlined" required>
          </v-text-field>

          <v-textarea v-model="description" counter :rules="[v => v.length <= 250 || 'Max 250 characters']" class="mb-2"
            name="description" type="text" label="Ad description" color="primary" variant="underlined" clearable
            required>
          </v-textarea>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col cols="12" md="6" lg="6" class="px-0">
        <v-checkbox v-model="checked" label="Ad promo?" color="red" @click="checked !== checked"
          hide-details></v-checkbox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <v-btn color="blue-grey" prepend-icon="mdi-cloud-upload">
          Upload
        </v-btn>
        <v-btn color="orange" class="mx-3" :disabled="!valid" @click="createAd">
          Create
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <img src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg" alt="" height="100">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      title: '',
      description: '',
      checked: false
    }
  },
  methods: {
    createAd() {
      if (!this.valid) return
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.checked,
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        }
        this.$store.dispatch('createAd', ad).then(() => this.$router.push('/list'))
      }
    },
  }
}
</script>
