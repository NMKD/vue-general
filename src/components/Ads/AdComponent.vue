<template>
  <v-container v-if="!loading" class="fill-height">
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

          <div class="px-5 py-5 d-flex align-center justify-space-between">

            <ad-edit-modal :ad="ad"></ad-edit-modal>

            <v-card-actions class="px-0">
              <v-btn :to="'/'" color="primary" variant="text">
                Home
              </v-btn>

              <v-btn target="_blank" :to="'/orders'" color="success" variant="flat">
                Buy
              </v-btn>
            </v-card-actions>
          </div>

        </v-card>
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
import AdEditModal from './AdEditModalComponent.vue'
export default {
  props: ['id'],
  components: {
    AdEditModal
  },
  computed: {
    ad() {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>
