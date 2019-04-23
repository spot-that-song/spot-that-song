<template>
  <v-list two-line>
    <v-subheader>Room '1'</v-subheader>
    <template v-for="(playerStatus, index) in status">
      <RoomStatusItem :index="index" :status="playerStatus" :key="playerStatus.id"/>
    </template>
    <v-subheader>Waiting all player to be ready...</v-subheader>
    <v-btn block color="primary" large v-on:click="readyUser">
      <v-icon>check</v-icon>
    </v-btn>
  </v-list>
</template>

<script>
import faker from "faker";
import RoomStatusItem from "../components/RoomStatusItem";
import { mapState } from "vuex";
import db from "../main.js";

function generateStatus(n) {
  return Array.from(Array(n), el => ({
    id: faker.random.uuid(),
    player: {
      name: faker.name.firstName(),
      avatar: faker.image.avatar()
    },
    joinedAt: `Joined ${faker.random.number({ min: 1, max: 10 })} minutes ago.`,
    isReady: Math.random() >= 0.5 // random boolean
  }));
}

export default {
  components: {
    RoomStatusItem
  },
  computed: mapState(["UserId"]),
  data: () => ({
    status: [],
    allReady: false
  }),
  created: function() {
    this.fetchStatus();
    this.status = generateStatus(5);
  },
  methods: {
    fetchStatus: function() {
      db.collection("rooms")
        .doc(this.$route.params.RoomID)
        .onSnapshot(room => {
          const roomData = room.data();
          let { players } = roomData;
          players = players.filter(player => {
            return player.ready != true;
          });
          if (!players.length) this.$router.push("/quiz");
          else this.allReady = false;
        });
    },
    readyUser() {
      db.collection("rooms")
        .doc(this.$route.params.RoomID)
        .get()
        .then(room => {
          let { players } = room.data();
          let findPlayer = players.find(player => {
            return player.playerId == this.UserId;
          });
          findPlayer.ready = true;
          return db
            .collection("rooms")
            .doc(this.$route.params.RoomID)
            .set({ players }, { merge: true });
        })
        .then(() => {
          console.log("Ready!");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
