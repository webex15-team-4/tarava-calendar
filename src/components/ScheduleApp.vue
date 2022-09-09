<template>
  <button v-on:click="scheduleRan">＋予定</button>

  <div v-if="scheduleKinou">
    <div class="inputContainer">
      <input type="text" v-model="inputComment" />
      <button v-on:click="push">追加</button>
      <button v-on:click="edit">編集</button>
      <button v-on:click="deletes">削除</button>
    </div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <span>{{ item.time }}:{{ item.text }}</span>
      </li>
    </ul>

    <select v-model="selectedTime">
      <option disabled value="">開始</option>
      <option
        v-for="time in optionTimes"
        v-bind:value="time.name"
        v-bind:key="time.id"
      >
        {{ time.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputComment: "",
      items: [],
      scheduleKinou: false,
      selectedTime: "",
      optionTimes: [
        { id: 1, name: "0:00" },
        { id: 2, name: "1:00" },
        { id: 3, name: "2:00" },
      ],
    }
  },
  methods: {
    scheduleRan: function () {
      if (this.scheduleKinou) {
        this.scheduleKinou = false
        console.log("予定作成欄が消えたよ")
      } else {
        this.scheduleKinou = true
        console.log("予定作成欄が出現したよ")
      }
    },

    push() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment, time: this.selectedTime })
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
      }
    },
    edit() {
      if (this.inputComment !== "") {
        this.items.push({ text: this.inputComment, time: this.selectedTime })
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
