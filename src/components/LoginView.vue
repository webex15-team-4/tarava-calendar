<template>
  <header>
    <div class="drawer">
      <input type="checkbox" id="drawer-check" class="drawer-hidden" />
      <label for="drawer-check" class="drawer-open"><span></span></label>
      <nav class="drawer-content">
        <ul class="drawer-list">
          <li class="drawer-item" style="list-style: none">
            <nav v-on:click="button">
              <p v-if="loginAcount" class="thick">ログイン</p>
              <p v-else class="thick">ログアウト</p>
            </nav>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
export default {
  name: "LoginView",
  data() {
    return {
      loginAcount: true,
      userEmail: "",
    }
  },
  // created() {
  //   const auth = getAuth()
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const user = auth.currentUser
  //       const email = user.email
  //       this.userEmail = email
  //       this.loginAcount = false
  //     } else {
  //       console.log("ユーザーなし")
  //     }
  //   })
  // },
  methods: {
    button() {
      if (this.loginAcount === true) {
        console.log("test")
        const provider = new GoogleAuthProvider()
        provider.addScope("")
        const auth = getAuth()
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            credential.accessToken
            result.user
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                const user = auth.currentUser
                const email = user.email
                this.userEmail = email
                this.loginAcount = false
              } else {
                console.log("ユーザーなし")
              }
            })
            this.loginAcount = false
          })
          .catch((error) => {
            GoogleAuthProvider.credentialFromError(error)
            console.log(error)
          })
      } else {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("ログアウトしました")
            this.userEmail = ""
            this.loginAcount = true
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          })
      }
    },
  },
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #fff;
}
.drawer-hidden {
  display: none;
}
.drawer-open {
  display: flex;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
  /* 重なり順を一番上に */
  cursor: pointer;
}
.drawer-open span,
.drawer-open span:before,
.drawer-open span:after {
  content: "";
  display: block;
  height: 3px;
  width: 25px;
  border-radius: 3px;
  background: #333;
  transition: 0.5s;
  position: absolute;
}
drawer-open span:before {
  bottom: 8px;
}
.drawer-open span:after {
  top: 8px;
}
#drawer-check:checked ~ .drawer-open span {
  background: rgba(255, 255, 255, 0);
}
#drawer-check:checked ~ .drawer-open span::before {
  bottom: 0;
  transform: rotate(45deg);
}
#drawer-check:checked ~ .drawer-open span::after {
  top: 0;
  transform: rotate(-45deg);
}
.drawer-content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 100%;
  z-index: 99;
  background: #fff;
  transition: 0.5s;
}
#drawer-check:checked ~ .drawer-content {
  left: 0;
}
.thick {
  font-weight: bold;
  font-size: large;
}
</style>
