<template>
  <CommentApp />
  <nav>
    <router-link to="/">Home</router-link> |<router-link to="/login"
      >ログイン</router-link
    >|
    <router-link to="/about">About</router-link>
  </nav>
  <!-- <router-view /> -->

  <Login />
  <Calendar />
  <!-- <ScheduleApp /> -->
  <!-- <KUziApp /> -->
</template>

<script>
import CommentApp from "./components/CommentApp.vue"
// import ScheduleApp from "@/components/ScheduleApp.vue"
import Calendar from "@/components/CalendarVue.vue"
import Login from "@/components/LoginView.vue"
// import KUziApp from "@/components/KUziApp.vue"
export default {
  components: {
    CommentApp,
    // ScheduleApp,
    Calendar,
    Login,
    // KUziApp,
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
