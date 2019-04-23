<template>
  <div :key="index">
    <v-divider v-if="index !== 0"></v-divider>
    <v-layout row align-center>
      <v-flex text-no-wrap pr-3 shrink>{{ index + 1 }}.</v-flex>
      <v-flex text-no-wrap xs5>{{ result.player ? result.player.name : '...' }}</v-flex>
      <v-flex text-no-wrap>{{ result.player ? result.game_length : '...' }}</v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['index', 'result']
}
</script>

<style>

</style>
