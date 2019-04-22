<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent="register">
          <center>
            <h2>Join the Competition!</h2>
          </center>

          <!-- EMAIL -->
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <!-- END OF EMAIL -->

          <!-- PASSWORD -->
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <!-- END OF PASSWORD -->

          <!-- SUBMIT BUTTON -->
          <v-btn color="info" type="submit">Register!</v-btn>
          <!-- END OF SUBMIT BUTTON -->

          <!-- RESET FORM -->
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <!-- END OF RESET FORM -->

          <br>
          <br>
          <!-- ALREADY HAVE AN ACCOUNT -->
          <h3>already have an account?</h3>
          <router-link to="/login" style="textDecoration:none;">
            <v-btn color="success">Login</v-btn>
          </router-link>
          <!-- END OF ALREADY HAVE AN ACCOUNT -->
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
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    register() {
      // FIREBASE AUTH
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          swal("Thank you for registering!", "", "success");
          this.$router.replace("login");
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