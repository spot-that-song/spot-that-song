<template>
  <div>
    <v-divider
      v-if="index !== 0"
      inset>
    </v-divider>

    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img :src="status.player.avatar">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="status.player.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="status.joinedAt"></v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-icon
          color="grey"
          v-if="!status.isReady"
          large
        >toggle_off</v-icon>
        <v-icon
          color="success"
          v-else
          large
        >toggle_on</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  props: ['index', 'status']
}
</script>

<style>

</style>
