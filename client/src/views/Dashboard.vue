<template>
  <div>
    <!-- TESTING -->
    <v-btn color="success" v-on:click="joinRoom">JOIN ROOM</v-btn>
    <h5>{{userEmail}}</h5>
    <!-- END OF TESTING -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../main.js";
import swal from "sweetalert";

export default {
  computed: mapState(["UserId", "userEmail"]),
  methods: {
    joinRoom() {
      let newPlayer = {
        playerId: this.UserId,
        position: 0,
        ready: false
      };
      db.collection("rooms")
        .doc("5ceu1brAV11Oloq08mFD")
        .get()
        .then(docref => {
          let { players } = docref.data();
          players.push(newPlayer);
          return db
            .collection("rooms")
            .doc("5ceu1brAV11Oloq08mFD")
            .set({ players }, { merge: true });
        })
        .then(() => {
          swal(
            "Welcome!",
            "Please wait until there are enough players..",
            "success"
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
