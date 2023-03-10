import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      console.log(payload);
      state.user = payload;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        commit("setUser", auth.currentUser);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
        throw error;
      }
    },

    async signIn({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(getAuth(), email, password);
        commit("setUser", auth.currentUser);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        switch (error.code) {
          case "auth/invalid-email":
            commit("setError", "Invalid email");
            break;
          case "auth/user-not-found":
            commit("setError", "No account with that email was found");
            break;
          case "auth/wrong-password":
            commit("setError", "Incorrect password");
            break;
          default:
            commit("setError", "Email or password incorrect");
            break;
        }
      }
    },

    authActions({ commit }, payload) {
      commit("setUser", payload);
    },

    async logout({ commit }) {
      await signOut(getAuth());
      commit("setUser", null);
    },
  },
  getters: {
    resUser(state) {
      return state.user;
    },
    isUserSingIn(state) {
      return state.user !== null;
    },
  },
};
