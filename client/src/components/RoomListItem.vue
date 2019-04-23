<template>
  <div>
    <v-divider v-if="index !== 0"></v-divider>
    <v-layout row align-center>
      <v-flex text-no-wrap pr-4 xs2>Room 1</v-flex>
      <v-flex text-no-wrap pr-4 xs2>3/5</v-flex>
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
      <v-flex shrink>
        <v-btn medium>Join</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['index', 'players']
}
</script>

<style>

</style>
