<template>
  <div id="app">
    <Login />
    <Calendar />
    <ScheduleApp />
  </div>
</template>

<script>
// import CommentApp from "./components/CommentApp.vue"
// import ScheduleApp from "@/components/ScheduleApp.vue"
import Calendar from "@/components/CalendarVue.vue"
import Login from "@/components/LoginView.vue"
import ScheduleApp from "@/components/ScheduleApp.vue"

//import Login from "@/components/LoginView.vue"
export default {
  components: {
    // CommentApp,
    Calendar,
    Login,
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
  background: url(https://thumb.photo-ac.com/d4/d4644727c8b6bb2cd8001c4d4a761d12_t.jpeg);
  background-size: cover;
  background-repeat: no-repeat;
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
