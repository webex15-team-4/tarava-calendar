<template>
<<<<<<< HEAD
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <CommentApp />
  <ScheduleApp />
=======
  <nav><router-link to="/">Home</router-link> |</nav>

  <Calendar />
>>>>>>> origin/master
</template>
<script>
import Calendar from "@/components/CalendarVue.vue"

export default {
  components: {
    Calendar,
  },
}
</script>

<script>
import CommentApp from "./components/CommentApp.vue"
import ScheduleApp from "@/components/ScheduleApp.vue"

export default {
  components: {
    CommentApp,
    ScheduleApp,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
