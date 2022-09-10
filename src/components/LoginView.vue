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
      auth.languageCode = "ja"
      signInWithPopup(auth, provider)
      const provider = new GoogleAuthProvider()
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
      provider.setCustomParameters({
        login_hint: "user@example.com",
      })
    },
  },
}
</script>
