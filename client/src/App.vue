<template>
  <v-app>
    <v-toolbar app dark>
      <router-link to="/" style="textDecoration:none;color:whitesmoke">
        <v-toolbar-title class="headline text-uppercase">
          <span>Spot That Song!</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <!-- REGISTER BUTTON -->
      <router-link to="/register" style="textDecoration:none;">
        <v-btn color="info" v-if="!isLoggedIn">Register</v-btn>
      </router-link>
      <!-- END OF REGISTER BUTTON -->

      <!-- LOGIN BUTTON -->
      <router-link to="/login" style="textDecoration:none;">
        <v-btn color="info" v-if="!isLoggedIn">Login</v-btn>
      </router-link>
      <!-- END OF LOGIN BUTTON -->

      <!-- DASHBOARD BUTTON -->
      <router-link to="/dashboard" style="textDecoration:none;">
        <v-btn color="info" v-if="isLoggedIn">Dashboard</v-btn>
      </router-link>
      <!-- END OF DASHBOARD BUTTON -->

      <!-- LOGOUT BUTTON -->
      <v-btn color="info" v-if="isLoggedIn" v-on:click="logout">Logout</v-btn>
      <!-- END OF LOGOUT BUTTON -->
    </v-toolbar>

    <v-content>
      <!-- <HelloWorld/> -->
      <!-- <LeaderBoard /> -->
      <router-view></router-view>
      <!-- <LeaderBoard/> -->
      <!-- <quiz/> -->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import LeaderBoard from "./components/LeaderBoard";
import quiz from "./components/quiz.vue";
import swal from "sweetalert";
import firebase from "firebase";
import { mapState } from "vuex";
import db from "./main.js";

export default {
  name: "App",
  components: {
    HelloWorld,
    LeaderBoard,
    quiz
  },
  data() {
    return {
      //
    };
  },
  computed: mapState(["isLoggedIn"]),
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // FIREBASE AUTH
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.$store.dispatch("login", user);
        } else {
          // No user is signed in.
          this.$store.commit("logout");
        }
      });
    },
    logout() {
      // FIREBASE AUTH
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("logout");
          this.$router.replace("home");
          swal("Bye-bye!", "", "success");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
