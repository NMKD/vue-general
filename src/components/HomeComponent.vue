<template>
  <v-container v-if="!loading" fluid>
    <v-row>
      <v-col cols="12">
        <v-carousel hide-delimiters show-arrows="hover" progress="primary" height="400">

          <v-carousel-item cover v-for="slide in promoAds" :key="slide.uid" :src="slide.src">
          </v-carousel-item>

        </v-carousel>
      </v-col>
      <v-col cols="12">
        <h1 class="my-10 text-center">Home</h1>
        <v-row justify="center" align-content="center">
          <v-col cols="12" md="6" lg="4" v-for="ad in ads" :key="ad.key">
            <v-card>
              <v-img :src="ad.src" height="200px" cover></v-img>

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
              <v-card-actions>

                <v-btn icon="mdi-heart" color="orange"></v-btn>

                <v-spacer></v-spacer>

                <v-btn :to="'/ad/' + ad.key" color="info" variant="tonal">
                  Open
                </v-btn>
                <buy-modal :ad="ad"></buy-modal>

              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center pt-10">
        <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BuyModal from '../components/Shared/BuyModal.vue';
export default {
  components: {
    BuyModal
  },
  computed: {
    promoAds() {
      return this.$store.getters.promoAds
    },
    ads() {
      return this.$store.getters.ads
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>
