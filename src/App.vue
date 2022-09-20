<template>

  <div id="app">
    <Login />
    <Calendar />
  </div>

</template>

<script>
import CommentApp from "./components/CommentApp.vue"
import ScheduleApp from "@/components/ScheduleApp.vue"
import Calendar from "@/components/CalendarVue.vue"

//import Login from "@/components/LoginView.vue"
export default {
  components: {
    CommentApp,
    ScheduleApp,
    Calendar,
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
