<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-carousel hide-delimiters show-arrows="hover" progress="primary" height="400">

          <v-carousel-item cover v-for="slide in promoAds" :key="slide.id" :src="slide.src">
          </v-carousel-item>

        </v-carousel>
      </v-col>
      <v-col cols="12">
        <h1 class="my-10 text-center">Home</h1>
        <v-row justify="center" align-content="center">
          <v-col cols="12" md="6" lg="4" v-for="slide in ads" :key="slide.id">
            <v-card>
              <v-img :src="slide.src" height="200px" cover></v-img>

              <v-card-title>
                {{ slide.title }}
              </v-card-title>

              <v-card-subtitle>
                1,000 miles of wonder
              </v-card-subtitle>

              <v-card-text>
                {{ slide.description }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>

                <v-btn icon="mdi-heart" color="orange"></v-btn>

                <v-spacer></v-spacer>

                <v-btn :to="'/ad/' + slide.id" color="info" variant="tonal">
                  Open
                </v-btn>
                <v-btn target="_blank" :to="'/orders'" color="success" variant="flat">
                  Buy
                </v-btn>

              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    promoAds() {
      return this.$store.getters.promoAds
    },
    ads() {
      return this.$store.getters.ads
    }
  }
}
</script>
