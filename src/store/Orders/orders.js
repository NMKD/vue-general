export default {
  state() {
    return {
      orders: [],
    };
  },
  mutations: {
    createOrders(state, payload) {
      state.orders.push(payload);
    },
  },
  actions: {
    async createOrders({ commit }, payload) {
      console.log(payload);
      commit("createOrders", payload);
    },
  },
  getters: {},
};
