<template>
  <v-container class="fill-height">
    <v-row justify="center" align-content="center">
      <v-col cols="12" md="6">
        <h1 class="my-10 text-center">Registration</h1>
        <v-form ref="form" v-model="form" lazy-validation>
          <v-text-field prepend-icon="mdi-account" type="email" name="email" :readonly="loading" v-model="email" :rules="emailRules"
            class="mb-2" label="Email" placeholder="Enter your Email" color="primary" variant="underlined" autocomplete="email" required>
          </v-text-field>

          <v-text-field prepend-icon="mdi-lock" name="password" type="password" v-model="password" :readonly="loading" :counter="8"
            :rules="passwordRules" label="Password" placeholder="Enter your password" color="primary"
            variant="underlined" required>
          </v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="confirm" name="confirm" type="password" :readonly="loading" :counter="8"
            :rules="confirmRules" label="Confirm password" placeholder="Enter your password again" color="primary"
            variant="underlined" required>
          </v-text-field>

          <br>
          <v-btn :disabled="!form" :loading="loading" color="success" @click="onSubmit" variant="elevated">
            Create account
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: false,
      loading: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (!!v && v.length >= 8) || 'Password must be equal or more than 8 characters',
      ],
      confirm: '',
      confirmRules: [
        v => !!v || 'Field confirm is required',
        v => v == this.password || 'Field must match the password'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    async onSubmit() {
      if (!this.form) return
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        console.log(valid, this.email, this.password)
        this.loading = true
      }
    },
  },
  watch: {
    confirm() {
      console.log(this.confirm)
    },
    password() {
      console.log(this.password)
    }
  }
}
</script>
