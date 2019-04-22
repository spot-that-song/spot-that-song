<template>
  <v-list two-line>
    <v-subheader>Room '1'</v-subheader>
    <template v-for="(playerStatus, index) in status">
      <RoomStatusItem
        :index="index"
        :status="playerStatus"
        :key="playerStatus.id"
      />
    </template>
    <v-subheader>Waiting all player to be ready...</v-subheader>
    <v-btn block color="primary" large>
      <v-icon>check</v-icon>
    </v-btn>
  </v-list>
</template>

<script>
import faker from 'faker'

import RoomStatusItem from './RoomStatusItem'

function generateStatus (n) {
  return Array.from(
    Array(n),
    el => ({
      id: faker.random.uuid(),
      player: {
        name: faker.name.firstName(),
        avatar: faker.image.avatar()
      },
      joinedAt: `Joined ${faker.random.number({ min: 1, max: 10 })} minutes ago.`,
      isReady: Math.random() >= 0.5 // random boolean
    })
  )
}

export default {
  components: {
    RoomStatusItem
  },
  data: () => ({
    status: []
  }),
  created: function () {
    // this.fetchStatus()
    this.status = generateStatus(5)
  },
  methods: {
    fetchStatus: function () {
      db
        .collection('status')
        .onSnapshot(function (querySnapshot) {
          this.room = {
            players: querySnapshot.docs.map(
              doc => ({
                id: doc.id,
                player: doc.get('player'),
                isReady: doc.get('isReady')
              })
            )
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
