<template>
  <div class="schedule">
    <button v-on:click="scheduleRan">＋予定</button>
  </div>
  <div v-if="scheduleKinou" class="scheduleKinou">
    <br />
    <div class="startend1">
      予定を追加
      <input type="text" v-model="inputComment" />
    </div>
    <br />

    <div class="startend2">
      <br />
      <div class="nichizi">日時を選択</div>
      始まり
      <input type="date" name="date" v-model="selectDate" />
      <option
        v-for="date in optionDate"
        v-bind:value="date.name"
        v-bind:key="date.id"
      >
        {{ date.name }}
      </option>
      <select v-model="selectedTime">
        <option disabled value="">Hour</option>
        <option
          v-for="time in optionTimes"
          v-bind:value="time.name"
          v-bind:key="time.id"
        >
          {{ time.name }}
        </option>
      </select>
      <select v-model="selectedTime2">
        <option disabled value="">Minute</option>
        <option
          v-for="time2 in optionTimes2"
          v-bind:value="time2.name"
          v-bind:key="time2.id"
        >
          {{ time2.name }}
        </option>
      </select>
    </div>

    <div class="startend3">
      終わり
      <input type="date" name="date" v-model="selectDate2" />
      <option
        v-for="date2 in optionDate2"
        v-bind:value="date2.name"
        v-bind:key="date2.id"
      >
        {{ date2.name }}
      </option>
      <select v-model="selectedTimeLast">
        <option disabled value="">Hour</option>
        <option
          v-for="lastTime in optionTimesLast"
          v-bind:value="lastTime.name"
          v-bind:key="lastTime.id"
        >
          {{ lastTime.name }}
        </option>
      </select>
      <select v-model="selectedTimeLast2">
        <option disabled value="">Minute</option>
        <option
          v-for="lastTime2 in optionTimesLast2"
          v-bind:value="lastTime2.name"
          v-bind:key="lastTime2.id"
        >
          {{ lastTime2.name }}
        </option>
      </select>
    </div>
    <br />

    <div class="startend4">
      <button v-on:click="push">追加</button>
      <button v-on:click="edit">編集</button>
      <button v-on:click="deletes">削除</button>
    </div>
  </div>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <span
          >{{ item.text }} {{ item.date }} {{ item.time }}:{{ item.time2 }} ~
          {{ item.date2 }} {{ item.lastTime }}:{{ item.lastTime2 }}</span
        >
        <!-- 一旦コメントアウトしとく削除機能
        <label class="commentItem">
          <input v-model="comment.index" />
          <p :class="{ index: item.index }">{{ item.text }}</p>
          <button v-on:click="deleteBtn(commentIndex)">削除</button>
        </label> -->
      </li>
    </ul>
  </div>
</template>
<script>
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      inputComment: "",
      items: [],
      scheduleKinou: false,
      selectDate: "",
      // dateSchedule: false,
      selectedTime: "",
      optionTimes: [
        { id: 1, name: "0" },
        { id: 2, name: "1" },
        { id: 3, name: "2" },
        { id: 4, name: "3" },
        { id: 5, name: "4" },
        { id: 6, name: "5" },
        { id: 7, name: "6" },
        { id: 8, name: "7" },
        { id: 9, name: "8" },
        { id: 10, name: "9" },
        { id: 11, name: "10" },
        { id: 12, name: "11" },
        { id: 13, name: "12" },
        { id: 14, name: "13" },
        { id: 15, name: "14" },
        { id: 16, name: "15" },
        { id: 17, name: "16" },
        { id: 18, name: "17" },
        { id: 19, name: "18" },
        { id: 20, name: "19" },
        { id: 21, name: "20" },
        { id: 22, name: "21" },
        { id: 23, name: "22" },
        { id: 24, name: "23" },
      ],
      selectedTime2: "",
      optionTimes2: [
        { id: 1, name: "00" },
        { id: 2, name: "05" },
        { id: 3, name: "10" },
        { id: 4, name: "15" },
        { id: 5, name: "20" },
        { id: 6, name: "25" },
        { id: 7, name: "30" },
        { id: 8, name: "35" },
        { id: 9, name: "40" },
        { id: 10, name: "45" },
        { id: 11, name: "50" },
        { id: 12, name: "55" },
      ],
      selectedTimeLast: "",
      optionTimesLast: [
        { id: 1, name: "0" },
        { id: 2, name: "1" },
        { id: 3, name: "2" },
        { id: 4, name: "3" },
        { id: 5, name: "4" },
        { id: 6, name: "5" },
        { id: 7, name: "6" },
        { id: 8, name: "7" },
        { id: 9, name: "8" },
        { id: 10, name: "9" },
        { id: 11, name: "10" },
        { id: 12, name: "11" },
        { id: 13, name: "12" },
        { id: 14, name: "13" },
        { id: 15, name: "14" },
        { id: 16, name: "15" },
        { id: 17, name: "16" },
        { id: 18, name: "17" },
        { id: 19, name: "18" },
        { id: 20, name: "19" },
        { id: 21, name: "20" },
        { id: 22, name: "21" },
        { id: 23, name: "22" },
        { id: 24, name: "23" },
      ],
      selectedTimeLast2: "",
      optionTimesLast2: [
        { id: 1, name: "00" },
        { id: 2, name: "05" },
        { id: 3, name: "10" },
        { id: 4, name: "15" },
        { id: 5, name: "20" },
        { id: 6, name: "25" },
        { id: 7, name: "30" },
        { id: 8, name: "35" },
        { id: 9, name: "40" },
        { id: 10, name: "45" },
        { id: 11, name: "50" },
        { id: 12, name: "55" },
      ],
    }
  },
  async created() {
    const q = query(collection(db, "Schedule"))

    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      this.items.push({
        text: doc.data().text,
        date: doc.data().date,
        time: doc.data().time,
        time2: doc.data().time2,
        date2: doc.data().date2,
        lastTime: doc.data().lastTime,
        lastTime2: doc.data().lastTime2,
      })
    })
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
    async push() {
      if (this.inputComment !== "") {
        this.items.push({
          text: this.inputComment,
          date: this.selectDate,
          time: this.selectedTime,
          time2: this.selectedTime2,
          date2: this.selectDate2,
          lastTime: this.selectedTimeLast,
          lastTime2: this.selectedTimeLast2,

          // {
          //   if (this.dateSchedule) {
          //     this
          //   }
          // }
        })
        let item = {
          text: this.inputComment,
          date: this.selectDate,
          time: this.selectedTime,
          time2: this.selectedTime2,
          date2: this.selectDate2,
          lastTime: this.selectedTimeLast,
          lastTime2: this.selectedTimeLast2,
        }
        this.inputComment = ""
        console.log(this.inputComment)
        console.log(this.items)
        console.log("追加できてるよ")
        await addDoc(collection(db, "Schedule"), item)

        this.inputMemo = ""
      }
    },
    edit() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else this.inputComment === "", {}
      this.inputComment = ""
    },
    deletes: function () {
      if (this.scheduleKinou) {
        this.scheduleKinou = false
        console.log("予定作成欄が消えたよ")
      }
    },
    // deleteBtn(commentIndex) {
    //   this.items.splice(commentIndex, 1)
    // },
  },
}
//dataプロパティとmethodsプロパティは{},になる
//methodsの末の関数の末は{},
//key: value,のオブジェクト
</script>
<style>
.schedule {
  display: flex;
  justify-content: flex-end;
}
.startend {
}
.scheduleKinou {
  border-top-style: double;
  border-bottom-style: double;
  border-right-style: double;
  border-left-style: double;
  border-color: #faa9b6;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: thick;
  width: 300px;
  background-color: #fed4db;
  border-radius: 20px;
  /* height: 200px; */
}
.startend1 {
}
.startend2 {
  border-top-style: double;
  border-color: #faa9b6;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: thick;
  width: 300px;
}
.startend3 {
}
.startend4 {
  border-top-style: double;
  border-color: #faa9b6;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: thick;
  width: 300px;
  radius: 50px;
}
.nichizi {
  text-align: center;
}
</style>
