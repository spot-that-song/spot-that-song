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
      score: faker.random.number()
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
    // this.fetchScores()
    this.scores = generateScores(6)
  },
  methods: {
    fetchScores: function () {
      db
        .collection('scores')
        .onSnapshot(function (querySnapshot) {
          this.scores = querySnapshot.docs.map(doc => ({
            id: doc.id,
            player: doc.get('player'),
            score: doc.get('score')
          }))
        })
    }
  }
}
</script>

<style>

</style>
