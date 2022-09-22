<template>
  <div class="inputContainer">
    <input type="text" v-model="inputComment" />
    <button v-on:click="push">追加</button>
    <button v-on:click="edit">編集</button>
    <button v-on:click="deletes">削除</button>
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
    push() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment })
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
      }
    },
    edit() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment })
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
      }
    },
    deletes() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      }
      //  else (this.inputComment === ""), {
      //   this.inputComment = ""
      // }
      // this.inputComment = ""
    },
  },
}
//dataプロパティとmethodsプロパティは{},になる
//methodsの末の関数の末は{},
//key: value,のオブジェクト
</script>

<style></style>
