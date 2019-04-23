<template>
  <RoomList/>
</template>

<script>
import { mapState } from "vuex";
import db from "../main.js";
import swal from "sweetalert";
import RoomList from "../components/RoomList";

export default {
  computed: mapState(["UserId", "userEmail", "rooms"]),
  components: {
    RoomList
  },
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
