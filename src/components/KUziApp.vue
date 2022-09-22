<template>
  <div class="allContainer">
    <section>
      <h1>ログイン認証</h1>
      <div class="loginBtn">
        <button v-on:click="GoogleButton">
          <p v-if="loginName">ログイン</p>
          <p v-else>ログアウト</p>
        </button>
        <button v-on:click="AcountDeletebtn" v-if="acountDelet">削除</button>
      </div>
    </section>
    <section class="display">
      <img :src="userImg" />
      <div>
        <p>{{ userName }}</p>
        <p>{{ userEmail }}</p>
      </div>
    </section>

    <!-- メモ投稿 始まり -->
    <section class="memoArea" v-if="memoArea">
      <div class="commentArea">
        <input type="text" v-model="inputMemo" />
        <div>
          <button @click="addBtn">追加</button>
          <button @click="selectBtn">選択削除</button>
          <button @click="allDeleteBtn">すべて消す</button>
        </div>
      </div>
      <ul>
        <li
          v-for="(comment, commentIndex) in comments"
          :key="commentIndex"
          style="list-style-type: none"
        >
          <label class="commentItem">
            <input type="checkbox" v-model="comment.done" />
            <p :class="{ done: comment.done }">{{ comment.text }}</p>
            <button v-on:click="deleteBtn(commentIndex)">削除</button>
          </label>
        </li>
      </ul>
    </section>
    <!-- メモ投稿 終わり -->
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth"
import {
  setDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteField,
  // getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/firebase.js"

export default {
  data() {
    return {
      userImg: "",
      userName: "",
      userEmail: "",
      loginName: true,
      inputMemo: "",
      comments: [],
      acountDelet: false,
      memoArea: false,
    }
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = auth.currentUser
        const displayName = user.displayName
        const email = user.email
        const photoURL = user.photoURL
        await setDoc(doc(db, "users", user.uid), {
          userName: displayName,
          userEmail: email,
          userImg: photoURL,
        })
        this.userImg = photoURL
        this.userEmail = email
        this.userName = displayName
        this.loginName = false
        this.acountDelet = true
        this.memoArea = true

        const q = query(
          collection(db, "userComment"),
          where("userEmail", "==", email)
        )
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          this.comments.push({ text: doc.data().text })
        })
        //105~113のとこをつかうイメージ
      } else {
        console.log("ユーザーなし")
      }
    })
  },
  methods: {
    GoogleButton() {
      if (this.loginName === true) {
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
                const displayName = user.displayName
                const email = user.email
                const photoURL = user.photoURL
                await setDoc(doc(db, "users", user.uid), {
                  userName: displayName,
                  userEmail: email,
                  userImg: photoURL,
                })
                this.userImg = photoURL
                this.userEmail = email
                this.userName = displayName
                this.loginName = false
                this.acountDelet = true
                this.memoArea = true

                const q = query(
                  collection(db, "userComment"),
                  where("userEmail", "==", email)
                )
                const querySnapshot = await getDocs(q)
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                  this.comments.push({ text: doc.data().text })
                })
              } else {
                console.log("ユーザーなし")
              }
            })
            this.loginName = false
            this.acountDelet = true
            this.memoArea = true
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
            this.userImg = ""
            this.userEmail = ""
            this.userName = ""
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          })
        this.loginName = true
        this.acountDelet = false
        this.memoArea = false
      }
    },
    AcountDeletebtn() {
      if (window.confirm("本当に削除しますか？")) {
        const auth = getAuth()
        const user = auth.currentUser

        if (user !== null) {
          deleteUser(user)
            .then(async () => {
              const userData = {
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
              }
              console.log(userData)
              const Data = doc(db, "users", user)
              await updateDoc(Data, {
                userData: deleteField(),
              })
            })
            .catch((error) => {
              console.log(error)
            })
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              alert("アカウントを削除しました")
              this.userImg = ""
              this.userEmail = ""
              this.userName = ""
              this.loginName = true
              this.acountDelet = false
              this.memoArea = false
            })
            .catch((error) => {
              // An error happened.
              console.log(error)
            })
        }
      }
    },
    addBtn() {
      if (this.inputMemo !== "") {
        this.comments.push({ text: this.inputMemo })
        console.log(this.inputMemo)

        const auth = getAuth()
        const user = auth.currentUser
        if (user !== null) {
          user.providerData.forEach(async (profile) => {
            let memo = {
              text: this.inputMemo,
              userName: profile.displayName,
              userEmail: profile.email,
              userImage: profile.photoURL,
            }
            await addDoc(collection(db, "userComment"), memo)
          })
        }
        this.inputMemo = ""
      } else {
        alert("コメントを入力してください")
      }
    },
    selectBtn() {
      if (window.confirm("本当に削除しますか？")) {
        let remains = []
        for (let i = 0; i < this.comments.length; i++) {
          if (!this.comments[i].done) {
            remains.push(this.comments[i])
          }
        }
        this.comments = remains
      }
    },
    allDeleteBtn() {
      if (window.confirm("本当に削除してもいいですか？") === true) {
        this.comments = []
      }
    },
    deleteBtn(commentIndex) {
      this.comments.splice(commentIndex, 1)
    },
  },
}
</script>

<style scoped>
.allContainer {
  text-align: center;
  user-select: noen;
}

.commentItem {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.done {
  text-decoration: line-through;
}

button {
  font-weight: bold;
  padding: 5px;
  margin: 0 2px;
}

.loginBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginBtn button {
  font-size: 15px;
  padding-top: 0px;
}
</style>
