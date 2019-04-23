<template>
  <v-sheet elevation="1">
    <v-container>
      <template v-for="(room, index) in rooms">
        <RoomListItem
          :key="room.id"
          :index="index"
          :players="room.players"
        />
      </template>
      <div class="my-4"></div>
      <v-btn block large color="primary"><v-icon>add</v-icon> New Room</v-btn>
    </v-container>
  </v-sheet>
</template>

<script>
import faker from 'faker'

import RoomListItem from './RoomListItem'

function generatePlayers (n) {
  return Array.from(
    Array(n),
    el => ({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      avatar: faker.image.avatar()
    })
  )
}

function generateRooms (n) {
  return Array.from(
    Array(n),
    el => ({
      id: faker.random.uuid(),
      players: generatePlayers(Math.floor(Math.random() * 5))
    })
  )
}

export default {
  components: {
    RoomListItem
  },
  data: () => ({
    rooms: []
  }),
  created: function () {
    this.rooms = generateRooms(5)
  }
}
</script>

<style>

</style>
