<template>
  <h1>りんご</h1>
  <div class="inputComment">{{ inputComment }}</div>
  <div>
    <textarea
      v-model="inputComment"
      @keydown.enter.exact="keyDownEnter"
      @keydown.enter.shift.exact="keyDownEnterShift"
      @keyup.enter.exact="keyUpEnter"
      class="textarea"
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
    keyDownEnter() {
      this.inputComment = `${this.inputComment}￥n`
      console.log("ボタンが押された！")
    },

    keyDownEnterShift() {
      console.log("shift,enter")
    },

    keyUpEnter() {
      console.log("ボタンが離れた！")
    },

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
      } else
        this.inputComment === "",
          {
            // this.inputComment = ""
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
