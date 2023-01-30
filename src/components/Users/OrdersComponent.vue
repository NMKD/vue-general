<template>
  <v-container v-if="!loading" fluid>
    <h1 class="text-center my-10">Orders</h1>
    <v-row justify="center" align-content="center">

      <v-col cols="12" sm="6" md="6" lg="6">

        <v-card class="mx-auto">
          <v-toolbar color="orange">

            <v-toolbar-title>Order Lists</v-toolbar-title>

            <v-spacer></v-spacer>

          </v-toolbar>

          <v-divider></v-divider>

          <v-list lines="10" select-strategy="multiple">
            <v-list-subheader>Today Date</v-list-subheader>
            <v-list-item class="my-3" v-for="order in orders" :key="order.key" :value="order.name">

              <div class="d-flex align-content-center justify-space-between">
                <div>
                  <v-checkbox v-model="order.done" :label="`${order.name}: ${order.phone}`" color="orange-darken-3"
                    hide-details @click="markDownOrders(order.key)"></v-checkbox>
                </div>
                <v-btn :to="'/ad/' + order.key" variant="text" color="primary">OPEN</v-btn>
              </div>
            </v-list-item>
          </v-list>
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
export default {
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    orders() {
      return this.$store.getters.getOrders
    },
  },
  methods: {
    async markDownOrders(order) {
      try {
        await this.$store.dispatch('markOrders', this.orders.find(o => o.key === order))
      } catch (error) {
        console.log(error)
      }

    },
  }
}
</script>
