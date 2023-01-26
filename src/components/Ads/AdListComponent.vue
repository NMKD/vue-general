<template>
  <v-container fluid>
    <v-row justify="center" align-content="center">
      <v-col cols="12" md="6" lg="6">
        <h1 class="my-10 text-center">Ad List</h1>
        <v-card class="mb-8" v-for="ad in myAds" :key="ad.uid" elevation="4">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ ad.title }}
              </v-card-title>

              <v-card-text>
                {{ ad.description }}
              </v-card-text>

              <v-card-actions>
                <v-btn variant="text" color="teal-accent-4" :to="'/ad/' + ad.uid">
                  Learn More
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="120" rounded="0">
              <v-img :src="ad.src" cover></v-img>
            </v-avatar>

          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds
    }
  }
}
</script>
