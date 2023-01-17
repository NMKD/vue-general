<template>
  <v-container class="fill-height">
    <v-row justify="center" align-content="center">
      <v-col cols="12" md="8" lg="8">
        <h1 class="my-10 text-center">Ad id</h1>
        <v-card elevation="5">
          <v-img :src="ad.src" cover></v-img>

          <v-card-title>
            {{ ad.title }}
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-text>
            {{ ad.description }}
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions class="py-5">
            <v-btn :to="'/'" color="primary" variant="text">
              Home
            </v-btn>
            <v-btn target="_blank" :to="'/orders'" color="success" variant="flat">
              Buy
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {

    }
  },
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    }
  }
}
</script>
