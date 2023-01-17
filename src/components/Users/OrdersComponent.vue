<template>
  <v-container fluid>
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

            <v-list-item class="my-3" v-for="order in orders" :key="order.id" :value="order.name">
              <template v-slot:prepend="{ isActive }">

                <v-list-item-action start>
                  <v-checkbox-btn color="success" :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
              </template>

              <div class="d-flex align-content-center justify-space-between">
                <div>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ order.phone }}
                  </v-list-item-subtitle>
                </div>
                <v-btn :to="'/ad/' + order.id" variant="text" color="primary">OPEN</v-btn>
              </div>

            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      orders: [
        {
          id: 'sa6',
          name: 'Kris',
          phone: '8-923-232-21',
          adId: '123',
          done: false
        },
        {
          id: 'sae6',
          name: 'Lara',
          phone: '8-923-232-21',
          adId: '12a3',
          done: false
        }
      ]
    }
  }
}
</script>
