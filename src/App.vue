<template>
  <div id="app">
    <Login />
    <Calendar />
    <ScheduleApp />
  </div>
  <p class="gradation2"><a href="">Tarava-calendar</a></p>
</template>

<script>
import Calendar from "@/components/CalendarVue.vue"
import Login from "@/components/LoginView.vue"
export default {
  components: {
    Calendar,
    Login,
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
  background-image: linear-gradient(to bottom,
      #324373,
      #6ba5f2,
      #77abd9,
      #f2b47e,
      #f28972);
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

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.gradation2 a {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
  display: block;
  line-height: 50px;
  width: 100%;
  text-align: center;
  color: #fff;
}
</style>
