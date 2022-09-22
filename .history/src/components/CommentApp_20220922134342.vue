<template>
  <button v-on:click="commentRan">りんご</button>

  <div v-if="commentKinou">
    <textarea
      v-model="inputComment"
      @keydown.enter.shift.exact="keyDownEnterShift"
      class="textarea"
    />
    <!-- ↑あえて書いてた\nの明示化を外した -->
    <button v-on:click="comment">コメント</button>
    <button v-on:click="cancel">キャンセル</button>

    <ul>
      <li class="show_return" v-for="(item, index) in items" :key="index">
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputComment: "",
      items: [],
      commentKinou: false,
    }
  },
  methods: {
    commentRan: function () {
      if (this.commentKinou) {
        this.commentKinou = false
        console.log("コメント欄が消えたよ")
      } else {
        this.commentKinou = true
        console.log("コメント欄が出現したよ")
      }
    },

    keyDownEnter() {
      this.inputComment = `${this.inputComment}￥n`
      console.log("ボタンが押された！")
    },

    keyDownEnterShift() {
      console.log("shift,enter")
    },

    comment() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment })
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
      } else {
        alert("文字を入力してね")
      }
    },
    cancel() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else
        this.inputComment === "",
          {
            // this.inputComment = ""
          }
      // this.inputComment = ""
    },
  },
}
// dataプロパティとmethodsプロパティは{},になる
// methodsの末の関数の末は{},
// key: value,のオブジェクト
</script>

<style>
これは半角スペースや改行の扱い方を示している .show_return {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
