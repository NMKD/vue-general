<template>
  <v-container fluid>
    <v-row justify="center" align-content="center">
      <v-col cols="12" md="6" lg="6">
        <h1 class="my-10 text-center">Login</h1>
        <v-form ref="form" v-model="form" lazy-validation>
          <v-text-field prepend-icon="mdi-account" type="email" name="email" :readonly="loading" v-model="email"
            :rules="emailRules" class="mb-2" label="Email" placeholder="Enter your Email" color="primary"
            variant="underlined" autocomplete="email" required>
          </v-text-field>

          <v-text-field prepend-icon="mdi-lock" type="password" name="password" v-model="password" :readonly="loading"
            :counter="8" :rules="passwordRules" label="Password" placeholder="Enter your password" color="primary"
            variant="underlined" required>
          </v-text-field>

          <br>

          <v-btn :disabled="!form" :loading="loading" color="success" @click="onSubmit" variant="elevated">
            Sign In
          </v-btn>
        </v-form>
        <v-alert class="my-10" v-show="errors" variant="outlined" type="warning" prominent border="top">
          {{ errors }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    errors: '',
    form: false,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (!!v && v.length >= 8) || 'Password must be equal or more than 8 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
  methods: {
    onSubmit() {
      if (!this.form) return
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password
        })
          .then(() => {
            if (!this.$store.getters.resUser) {
              return this.errors = this.$store.getters.error
            } else {
              this.$router.push('/')
            }
          })
      }
    },
  },
  components: {
    // snakeBars
  }
}
</script>
