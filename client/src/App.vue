<template>
  <div id="app">
    <aside>
      <div class="users">
        <ul>
          <li v-for="user in users">
            {{ user }}
            <span v-if="user === name">(나)</span>
          </li>
        </ul>
      </div>
    </aside>
    <main>
      <div ref="messages" class="messages">
        <ul>
          <li v-for="message in messages">
            {{ message }}
          </li>
        </ul>
      </div>
      <form v-if="connected" @submit="submit">
        <input ref="input" type="text" v-model="message">
        <button>Send</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      connected: false,
      name: '',
      users: [],
      messages: [],
      message: ''
    }
  },
  sockets: {
    connect () {
      this.connected = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    disconnect () {
      this.connected = false
    },
    profile (data) {
      this.name = data.name
    },
    users (data) {
      this.users = data.users
    },
    say (data) {
      this.show(data.name, data.body)
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.$socket.emit('say', this.message)
      this.show(this.name, this.message)
      this.message = ''
    },
    show (name, body) {
      this.messages.push(`${name}: ${body}`)
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = 100000
      })
    }
  }
}
</script>

<style>
#app {
}

#app aside,
#app main {
  float: left;
  height: 100vh;
}

#app aside {
  width: 150px;
  background: #000;
  color: #FFF;
}

#app main {
  position: relative;
  width: calc(100% - 150px);
}

#app .messages {
  height: calc(100vh - 30px);
}

#app .users,
#app .messages {
  padding: 5px;
  overflow-x: hidden;
  overflow-y: auto;
}

#app form {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  padding: 2px;
}

#app form input,
#app form button {
  float: left;
  height: 100%;
}

#app form input {
  width: calc(100% - 50px);
  border: 1px solid #CCC;
}

#app form button {
  margin-left: 2px;
  width: 48px;
  border: 0;
  background: #000;
  color: #FFF;
  text-transform: uppercase;
}
</style>
