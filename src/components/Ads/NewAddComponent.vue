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

        <v-file-input accept="image/png, image/jpeg" label="File input" @change="onChangeFile"></v-file-input>
        <img v-if="src" :src='src' alt="cars" height="100" />

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
        <v-btn color="orange" :disabled="!valid || !image" @click="createAd" :loading="loading">
          Create
        </v-btn>
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
      checked: false,
      image: null,
      src: '',
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd() {
      if (!this.valid && !this.src) return
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.checked,
          src: this.image
        }
        this.$store.dispatch('createAd', ad).then(() => this.$router.push('/list'))
      }
    },
    onChangeFile(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.src = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
