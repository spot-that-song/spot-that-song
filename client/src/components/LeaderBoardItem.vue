<template>
  <div>
    <v-divider
      v-if="index !== 0"
      inset>
    </v-divider>

    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img :src="score.player.avatar">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="score.player.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="score.score"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  props: ['index', 'score']
}
</script>

<style>

</style>
