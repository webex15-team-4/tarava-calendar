<template>
  <h1>りんご</h1>
  <div class="inputContainer">
    <input type="text" v-model="inputComment" />
    <button v-on:click="comment">コメント</button>
    <button v-on:click="cancel">キャンセル</button>
  </div>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <span>{{ inputComment }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      inputComment: "",
      item: [],
    }
  },
  methods: {
    comment() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment })
      }
      //if (this.inputComment)
    },
  },
}
</script>

<style></style>
