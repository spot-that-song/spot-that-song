<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent="login">
          <center>
            <h2>Continue Spotting!</h2>
          </center>

          <!-- EMAIL -->
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <!-- END OF EMAIL -->

          <!-- PASSWORD -->
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <!-- END OF PASSWORD -->

          <!-- SUBMIT BUTTON -->
          <v-btn color="info" type="submit">Let's Go!</v-btn>
          <!-- END OF SUBMIT BUTTON -->

          <!-- RESET FORM -->
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <!-- END OF RESET FORM -->
          <br>
          <br>

          <!-- OTHER LOGIN OPTIONS -->
          <h3>or login with our social partners!</h3>
          <v-btn color="success" v-on:click="googleSignIn">Google</v-btn>
          <v-btn color="warning" v-on:click="githubSignIn">Github</v-btn>
          <!-- END OF OTHER LOGIN OPTIONS -->
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import swal from "sweetalert";

export default {
  data: () => ({
    email: "",
    password: "",
    valid: true,
    show1: false,
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    login() {
      // FIREBASE AUTH
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          swal("You are now connected!", "", "success");
          this.$store.dispatch("login");
          this.$router.replace("/dashboard");
        })
        .catch(err => {
          swal("Oops...", err.message, "error");
        });
    },
    googleSignIn() {
      // FIREBASE AUTH
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          swal("You are now connected via Google!", "", "success");
          this.$store.dispatch("login");
          this.$router.replace("/dashboard");
        })
        .catch(err => {
          swal("Oops...", err.message, "error");
        });
    },
    githubSignIn() {
      // FIREBASE AUTH
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          swal("You are now connected via Github!", "", "success");
          this.$store.dispatch("login");
          this.$router.replace("/dashboard");
        })
        .catch(err => {
          swal("Oops...", err.message, "error");
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 30% !important;
  margin-top: 4%;
}
</style>