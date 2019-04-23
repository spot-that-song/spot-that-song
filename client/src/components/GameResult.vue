<template>
  <v-sheet elevation="1">
    <v-container>
      <v-subheader>Room 1 Game Result</v-subheader>
      <template v-for="(result, index) in results">
        <GameResultItem
          :key="index"
          :index="index"
          :result="results[index]"
        />
      </template>
    </v-container>
  </v-sheet>
</template>

<script>
import faker from 'faker'

import GameResultItem from './GameResultItem'

function generateResults (n) {
  const playerCount = Math.floor(Math.random() * n)
  return Array.from(
    Array(n),
    (el, index) => (index <= playerCount) && ({
      player: {
        id: faker.random.uuid(),
        name: faker.name.firstName(),
        avatar: faker.image.avatar()
      },
      game_length: `Finish in ${faker.random.number({ min: 1, max: 5})} minutes.`
    })
  )
}

export default {
  components: {
    GameResultItem
  },
  data: () => ({
    results: []
  }),
  created: function () {
    this.results = generateResults(5)
  }
}
</script>

<style>

</style>
