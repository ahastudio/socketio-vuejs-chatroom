<template>
    <div class="room">
        <aside>
            <div class="users">
                <ul>
                    <li v-for="user in users" :key="user.id">
                        {{ user.name }}
                        <span v-if="user.id === me.id">(나)</span>
                    </li>
                </ul>
            </div>
        </aside>
        <main>
            <div ref="messages" class="messages">
                <ul>
                    <li v-for="message in messages" :key="message.id">
                        {{ message.name }}:
                        {{ message.body }}
                    </li>
                </ul>
            </div>
            <form @submit="submit">
                <input ref="input" type="text" v-model="body">
                <button>Send</button>
            </form>
        </main>
    </div>
</template>

<script>
export default {
  name: 'room',
  props: ['me'],
  data() {
    return {
      users: [],
      messages: [],
      body: '',
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
  sockets: {
    users(data) {
      this.users = data.users;
    },
    say(data) {
      this.show(data);
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.$socket.emit('say', this.body);
      this.show({
        name: this.me.name,
        body: this.body,
      });
      this.body = '';
    },
    show({ name, body }) {
      const id = this.messages.length + 1;
      this.messages.push({ id, name, body });
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = 100000;
      });
    },
  },
};
</script>

<style>
    .room {
    }

    .room aside,
    .room main {
        float: left;
        height: 100vh;
    }

    .room aside {
        width: 150px;
        background: #000;
        color: #FFF;
    }

    .room main {
        position: relative;
        width: calc(100% - 150px);
    }

    .room .messages {
        height: calc(100vh - 30px);
    }

    .room .users,
    .room .messages {
        padding: 5px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .room form {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        padding: 2px;
    }

    .room form input,
    .room form button {
        float: left;
        height: 100%;
    }

    .room form input {
        width: calc(100% - 50px);
        border: 1px solid #CCC;
    }

    .room form button {
        margin-left: 2px;
        width: 48px;
        border: 0;
        background: #000;
        color: #FFF;
        text-transform: uppercase;
    }
</style>
