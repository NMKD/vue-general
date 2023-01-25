// Composables
import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "@/views/Home.vue";
import Login from "@/views/Auth/Login.vue";
import Registration from "@/views/Auth/Registration.vue";
import Account from "@/views/Users/Account.vue";
import Orders from "@/views/Users/Orders.vue";
import List from "@/views/Ads/List.vue";
import NewAdd from "@/views/Ads/NewAdd.vue";
import Ad from "@/views/Ads/Ad.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "registration",
        name: "Registration",
        component: Registration,
      },
      {
        path: "account",
        name: "Account",
        component: Account,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "list",
        name: "List",
        component: List,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "new",
        name: "NewAdd",
        component: NewAdd,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "ad/:id",
        props: true,
        name: "Ad",
        component: Ad,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.resUser) {
      next();
      return;
    }
    next("/list");
  } else {
    next();
  }
});

export default router;
