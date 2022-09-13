<template>
  <h1>りんご</h1>
  <div class="inputContainer">
    <textarea
      v-model="inputComment"
      @keydown.enter.exact="keyDownEnter"  <!--enterをkeydownした時のイベント-->
      @keyup.enter.exact="keyUpEnter"  <!--enterをkeyupした時のイベント-->
      @keydown.enter.shift="keyEnterShift" <!--enterとshiftをkeydownした時のイベント-->
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
    keyDownEnter(e: any) {
      e.preventDefault() //改行を無効化
    },
    keyUpEnter(e: any) {
      e.preventDefault() // 改行を無効化
      console.log(e.keyCode) // 13
      this.comment() //送信
    },
    keyEnterShift(e: any) {
      console.log('shift,enter')
    },
    comment() {
      this.item.text = this.inputComment
      this.inputComment = ''
    }

    // comment() {
    //   if (this.inputComment !== "") {
    //     this.items.push({ text: this.inputComment })
    //     this.inputComment = ""
    //     console.log(this.inputComment)
    //     console.log(this.items)
    //   }
    //   //if (this.inputComment)
    // },
    cancel() {
      // if (this.inputComment !== "") {
      //   this.inputComment = ""
      // } else (this.inputComment === "") {
      //   this.inputComment = ""
      // }
      this.inputComment = ""
    },
  },
}
//dataプロパティとmethodsプロパティは{},になる
//methodsの末の関数の末は{},
//key: value,のオブジェクト
</script>

<style></style>
