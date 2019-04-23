<template>
  <div>
    <v-divider v-if="index !== 0"></v-divider>
    <v-layout row align-center>
      <v-flex text-no-wrap pr-4 xs2>Room {{index + 1}}</v-flex>
      <v-flex text-no-wrap pr-4 xs2>{{players.length}}/2</v-flex>
      <v-flex grow>
        <template v-for="player in players">
          <v-chip :key="player.id">
            <v-avatar>
              <img :src="player.avatar">
            </v-avatar>
            <span v-html="player.name"></span>
          </v-chip>
        </template>
      </v-flex>
      <v-flex shrink v-on:click="joinRoom">
        <v-btn medium>JOIN</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../main.js";
import swal from "sweetalert";
export default {
  props: ["index", "players", "RoomID"],
  computed: mapState(["UserId", "userEmail", "rooms"]),
  methods: {
    joinRoom() {
      let newPlayer = {
        playerId: this.UserId,
        position: 0,
        ready: false,
        score: 0
      };
      db.collection("rooms")
        .doc(this.RoomID)
        .get()
        .then(docref => {
          let { players } = docref.data();
          players.push(newPlayer);
          return db
            .collection("rooms")
            .doc(this.RoomID)
            .set({ players }, { merge: true });
        })
        .then(() => {
          swal(
            "Welcome!",
            "Please wait until there are enough players..",
            "success"
          );
          this.$router.replace(`/dashboard/lobby/${this.RoomID}`);
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
