<template>
    <div class="app">
        <div v-if="connected">
            <Room :me="me"/>
        </div>
    </div>
</template>

<script>
import Room from './components/Room.vue';

export default {
  name: 'app',
  components: {
    Room,
  },
  data() {
    return {
      connected: false,
      me: {},
    };
  },
  sockets: {
    connect() {
      this.connected = true;
    },
    disconnect() {
      this.connected = false;
    },
    profile(data) {
      this.me = data;
    },
  },
};
</script>

<style>
    .app {
        font-size: 14px;
    }
</style>
