<template>
  <div class="calendar">
    <div class="calender2">
      <div id="header">
        <span class="header-arrow" v-on:click="lastMonth">＜</span>
        <span class="selected-month">{{ year }}年{{ month }}月</span>
        <span class="header-arrow" v-on:click="nextMonth">＞</span>
      </div>
      <div>
        <table id="main">
          <thead>
            <th v-for="(dayName, dayIndex) in weekdays" :key="dayIndex">
              {{ dayName }}
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(weekData, weekDataIndex) in calendar"
              :key="weekDataIndex"
            >
              <td
                v-for="(dayNumber, dayNumberIndex) in weekData"
                :key="dayNumberIndex"
                :class="{ today: isToday(dayNumber) }"
              >
                <!-- 27行目 ほんまっちとあわせるところ -->
                <span v-on:click="commentRan">{{ dayNumber }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- ほんまっちとあわせるところ（予定作成機能） -->
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
        <!-- 一旦コメントアウトしとく削除機能 -->
        <!-- <label class="commentItem">
          <input v-model="comments" />
          <p :class="{ index: item.index }">{{ item.text }}</p>
          <button v-on:click="deleteBtn(commentIndex)">削除</button>
        </label> -->
      </li>
    </ul>
  </div>
  <!-- 36～69行目 ほんまっちとあわせるところ（コメント機能） -->
  <div v-if="commentKinou" class="calender2">
    <div class="commentRan">
      <br />
      <textarea
        v-model="inputComment"
        @keydown.enter.shift.exact="keyDownEnterShift"
        class="textarea"
      />

      <!-- ↑あえて書いてた\nの明示化を外した -->
      <div class="commentButton">
        <br />
        <button v-on:click="comment(commentAreaId)">コメント</button>
        <button v-on:click="cancel">キャンセル</button>
        <!-- 50行目 必要かわからない処理 -->
        <!-- <button v-on:click="allDeletBtn(commentAreaId)">すべて消す</button> -->
      </div>
    </div>

    <ul v-if="commentAreaId !== null">
      <li
        class="show_return"
        v-for="(item, commentIndex) in containers[commentAreaId].items"
        :key="commentIndex"
        style="list-style-type: none"
      >
        <label class="commentItem">
          <input v-model="comment.done" />
          <p :class="{ done: item.done }">{{ item.text }}</p>
          <button v-on:click="deleteBtn(commentIndex)">削除</button>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
// 73～74行目 ほんまっちとあわせるところ(コメント機能と予定作成機能)
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      year: 2021,
      month: 3,
      today: "",
      // 84～92行目 ほんまっちとあわせるところ（コメント機能）
      inputComment: "",
      items: [],
      commentKinou: false,
      containers: [
        { id: 0, text: "１", items: [] },
        { id: 1, text: "２", items: [] },
        { id: 2, text: "３", items: [] },
      ],
      commentAreaId: null,
      // ほんまっちとあわせるところ（予定作成機能）
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
      // 削除ボタンに対するreturn
      // comments: "",
    }
  },
  computed: {
    calendar: function () {
      let calendar = []
      let firstWeekDay = new Date(this.year, this.month - 1, 1).getDay()
      let lastDay = new Date(this.year, this.month, 0).getDate()
      let dayNumber = 1
      while (dayNumber <= lastDay) {
        let weekData = []
        for (let i = 0; i <= 6; i++) {
          if (calendar.length == 0 && i < firstWeekDay) {
            weekData[i] = ""
          } else if (lastDay < dayNumber) {
            weekData[i] = ""
          } else {
            weekData[i] = dayNumber
            dayNumber++
          }
        }
        calendar.push(weekData)
      }
      return calendar
    },
  },
  // 119～128行目 ほんまっちとあわせるところ（コメント機能と予定作成機能）
  async created() {
    const q = query(collection(db, "Comment"))

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
    lastMonth: function () {
      if (this.month == 1) {
        this.year--
        this.month = 12
      } else {
        this.month--
      }
    },
    nextMonth: function () {
      if (this.month == 12) {
        this.year++
        this.month = 1
      } else {
        this.month++
      }
    },

    isToday: function (day) {
      let date = this.year + "-" + this.month + "-" + day
      if (this.today == date) {
        return true
      }
      return false
    },
    // ほんまっちとあわせるところ（予定作成機能）
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
    // 削除ボタンを押したときの処理
    // deleteBtn(commentIndex) {
    //   this.items.splice(commentIndex, 1)
    //   console.log("削除できたよ")
    // },

    // 153～198行目 ほんまっちとあわせるところ（コメント機能）
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
    async comment() {
      if (this.inputComment !== "") {
        this.containers.push({ text: this.inputComment })
        this.items.push({ text: this.inputComment })
        console.log(this.inputComment)
        console.log("コメントできたよ")

        let memo = {
          text: this.inputComment,
        }
        await addDoc(collection(db, "Comment"), memo)

        this.inputMemo = ""
      } else {
        alert("コメントを入力してください")
      }
    },
    cancel: function () {
      if (this.commentKinou) {
        this.commentKinou = false
        console.log("コメント欄が消えたよ")
      }
    },
    deleteBtn(commentIndex) {
      this.items.splice(commentIndex, 1)
    },
  },

  mounted() {
    let date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    let actualDay = date.getDate()
    this.today = this.year + "-" + this.month + "-" + actualDay
  },
}
</script>

<style scoped>
#main {
  border: 1px solid #333;
  width: 100%;
}
td {
  border: 1px solid #333;
  padding-bottom: 6%;
}
#main th {
  text-align: center;
  font-weight: normal;
  color: black;
}
#header {
  font-size: 24px;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
  background-color: green;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
#header span {
  padding: 15px 20px;
  color: white;
  display: inline-block;
}
.today {
  background-color: pink;
}
/* ほんまっちとあわせるところ（予定作成機能） */
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
/* 242～275行目 ほんまっちとあわせるところ（コメント機能） */
.show_return {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.commentItem {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.calendar {
  /* margin-left: 110px; */
  /* display: flex; */
}
.textarea {
  width: 230px;
  height: 50px;
}
.commentRan {
  border-top-style: double;
  border-bottom-style: double;
  border-right-style: double;
  border-left-style: double;
  border-color: rgb(9, 246, 9);
  background-color: rgb(133, 246, 133);
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 270px;
  border-width: thick;
  border-radius: 20px;
}
.commentButton {
  color: aquamarine;
}
</style>
