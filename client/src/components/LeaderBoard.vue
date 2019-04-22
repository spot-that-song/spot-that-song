<template>
  <v-list two-line>
    <v-subheader>Leaderboard</v-subheader>
    <template v-for="(score, index) in scores">
      <LeaderBoardItem
        :index="index"
        :score="score"
        :key="score.id"
      />
    </template>
  </v-list>
</template>

<script>
import faker from "faker"

import LeaderBoardItem from './LeaderBoardItem'

function generateScores (n) {
  return Array.from(
    Array(n),
    el => ({
      id: faker.random.uuid(),
      player: {
        name: faker.name.firstName(),
        avatar: faker.image.avatar()
      },
      score: faker.random.number(),
      show: true
    })
  )
}

export default {
  components: {
    LeaderBoardItem
  },
  data: () => ({
    scores: []
  }),
  created: function () {
    this.scores = generateScores(5)
  }
}
</script>

<style>

</style>
