<template>
  <div>
    <h2>ログイン</h2>
    <button v-on:click="login">Googleアカウントでログイン</button>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

import HelloWorld from "@/components/HelloWorld.vue"
export default {
  name: "LoginView",
  components: {
    HelloWorld,
  },
  data() {
    return {}
  },
  methods: {
    login() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      auth.languageCode = "ja"
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
