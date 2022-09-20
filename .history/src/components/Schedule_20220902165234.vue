<template>
  <h1>りんご</h1>
  <div class="inputContainer">
    <input type="text" v-model="inputComment" />
    <button v-on:click="comment">コメント</button>
    <button v-on:click="cancel">キャンセル</button>
  </div>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      inputComment: "",
      items: [],
    }
  },
  methods: {
    comment() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment })
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
      }

    },
    cancel() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else (this.inputComment === "") {
        this.inputComment = ""
      }
      this.inputComment = ""
    },
  },
}
//dataプロパティとmethodsプロパティは{},になる
//methodsの末の関数の末は{},
//key: value,のオブジェクト
</script>

<style></style>
