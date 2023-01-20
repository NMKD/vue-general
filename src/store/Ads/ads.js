export default {
  state() {
    return {
      ads: [
        {
          title: "First",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "1",
        },
        {
          title: "Second",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "2",
        },
        {
          title: "Third",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "3",
        },
        {
          title: "Four",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: false,
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "4",
        },
      ],
    };
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
  },
  actions: {
    createAd({ commit }, payload) {
      payload.id = "dsdwedwq";
      commit("createAd", payload);
    },
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter((ad) => ad.promo);
    },
    myAds(state) {
      return state.ads;
    },
    adById(state) {
      return (adId) => {
        return state.ads.find((ad) => ad.id === adId);
      };
    },
  },
};
