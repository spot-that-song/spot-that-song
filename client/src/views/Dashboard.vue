<template>
  <div>
    <RoomList v-if="this.$route.path == '/dashboard'"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "../main.js";
import swal from "sweetalert";
import RoomList from "../components/RoomList";

export default {
  components: {
    RoomList
  },
  methods: {}
};
</script>

<style>
</style>
