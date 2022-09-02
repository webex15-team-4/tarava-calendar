<template>
  <h1>りんご</h1>
  <div class="inputContainer">
    <textarea
      v-model="inputComment"
      v-on:keydown.enter.exact.prevent
      v-on:keyup.enter.exact="MoveFocus"
      v-on:keydown.enter.shift.exact="NewLine"
    />
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
    MoveFocus() {
      // TODO: Enterキー押下時に必要な処理（例：フォーカス移動）を行う。
    },
    NewLine() {
      // 改行処理の例
      this.textdata = `${this.textdata}\n`
    },

    comment() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment })
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
      }
      //if (this.inputComment)
    },
    cancel() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else (this.inputComment === ""), {
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
