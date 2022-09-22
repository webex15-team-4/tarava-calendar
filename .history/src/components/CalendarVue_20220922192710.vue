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
      <!-- 112～169行目 さえちゃんの色機能のとこ -->
      <!-- ボタンを押したら色機能を表示 -->
      <div style="align-content: center"></div>
      <div class="showColor" v-bind:style="selectedColor"></div>
      <button v-on:click="irokinou">背景色を変更</button>
      <!-- 予定の背景の色を変化...クリックした色を表示させる
    <div class="output" :style="bgColor"></div> -->

      <!-- Paletteを作る -->
      <!-- デフォルトカラー14色 -->
      <section v-if="colorArea" class="color">
        <div class="DefaultPalette">
          <div
            v-for="(defaultColor, defaultColorIndex) in defaultColors"
            :key="defaultColorIndex"
            @click="defaultColorBtn(defaultColor.id)"
          >
            <div :class="defaultColor.colorid">{{ defaultColor.color }}</div>
          </div>
        </div>
        <!-- パステルカラー12色 -->
        <div class="PastelPalette">
          <br />
          <div
            v-for="(pastelColor, pastelColorIndex) in pastelColors"
            :key="pastelColorIndex"
            @click="pastelColorBtn(pastelColor.id)"
          >
            <div :class="pastelColor.colorid">{{ pastelColor.color }}</div>
          </div>
        </div>

        <!-- グラデーション11色 -->
        <div class="GradationColor">
          <br />
          <div
            v-for="(gradationColor, gradationColorIndex) in gradationColors"
            :key="gradationColorIndex"
            @click="gradationColorBtn(gradationColor.id)"
          >
            <div :class="gradationColor.colorid">
              {{ gradationColor.color }}
            </div>
          </div>
        </div>

        <!-- ミックス6色 -->
        <div class="MixColor">
          <br />
          <div
            v-for="(mixColor, mixColorIndex) in mixColors"
            :key="mixColorIndex"
            @click="mixColorBtn(mixColor.id)"
          >
            <div :class="mixColor.colorid">{{ mixColor.color }}</div>
          </div>
        </div>
      </section>
    </div>
    <br />

    <div class="startend4">
      <button v-on:click="commentpush" class="scheduleButton1">追加</button>
      <button v-on:click="edit" class="scheduleButton2">編集</button>
      <button v-on:click="deletes" class="scheduleButton3">削除</button>
    </div>
  </div>
  <br />
  <br />
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
  <div>
    <!-- <ul class="ul"> -->
    <li v-for="item in items" :key="item" class="li">
      <div v-bind:style="item.color" class="itemColor">
        <h1 class="itemText">{{ item.text }}</h1>
        <!-- {{ item.date }}  -->
        {{ item.time }}:{{ item.time2 }} ~
        <!-- {{ item.date2 }} -->
        {{ item.lastTime }}:{{ item.lastTime2 }}
      </div>
      <!-- 一旦コメントアウトしとく削除機能 -->
      <!-- <label class="commentItem">
          <input v-model="comments" />
          <p :class="{ index: item.index }">{{ item.text }}</p>
          <button v-on:click="deleteBtn(commentIndex)">削除</button>
        </label> -->
    </li>
    <!-- </ul> -->
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
      // 345～528行目 さえちゃんの色機能のとこ
      isVisible: true,
      colorArea: false,
      bgColor: {
        backgroundColor: "white",
        backgroundImage: "",
      },
      colors: [
        {
          id: 0,
          colorid: "color1",
          cl: "linear-gradient(to right, rgb(233, 37, 37))",
        },
        {
          id: 1,
          colorid: "color2",
          cl: "linear-gradient(to right, #ff007f, #ff007f)",
        },
        {
          id: 2,
          colorid: "color3",
          cl: "linear-gradient(to right, #ff00ff, #ff00ff)",
        },
        {
          id: 3,
          colorid: "color4",
          cl: "linear-gradient(to right, #7f00ff, #7f00ff)",
        },
        {
          id: 4,
          colorid: "color5",
          cl: "linear-gradient(to right, purple, purple)",
        },
        {
          id: 5,
          colorid: "color6",
          cl: "linear-gradient(to right, #0000ff, #0000ff)",
        },
        {
          id: 6,
          colorid: "color7",
          cl: "linear-gradient(to right, #00ffff, #00ffff)",
        },
        {
          id: 7,
          colorid: "color8",
          cl: "linear-gradient(to right, #007fff, #007fff)",
        },
        {
          id: 8,
          colorid: "color9",
          cl: "linear-gradient(to right, #00ff7f, #00ff7f)",
        },
        {
          id: 9,
          colorid: "color10",
          cl: "linear-gradient(to right, #00ff00, #00ff00)",
        },
        {
          id: 10,
          colorid: "Gcolor11",
          cl: "linear-gradient(to right, greenyellow, greenyellow)",
        },
        {
          id: 11,
          colorid: "Gcolor12",
          cl: "linear-gradient(to right, #ffff00, #ffff00)",
        },
        {
          id: 12,
          colorid: "Gcolor13",
          cl: "linear-gradient(to right, #ff7f00, #ff7f00)",
        },
        {
          id: 13,
          colorid: "Gcolor14",
          cl: "linear-gradient(to right, rgb(56, 56, 56, rgb(56, 56, 56))",
        },
        {
          id: 14,
          colorid: "Pcolor1",
          cl: "linear-gradient(to right, #ff7f7f, #ff7f7f)",
        },
        {
          id: 15,
          colorid: "Pcolor2",
          cl: "linear-gradient(to right, #ff7fbf, #ff7fbf)",
        },
        {
          id: 16,
          colorid: "Pcolor3",
          cl: "linear-gradient(to right, #ff7fff, #ff7fff)",
        },
        {
          id: 17,
          colorid: "Pcolor4",
          cl: "linear-gradient(to right, #bf7fff, #bf7fff)",
        },
        {
          id: 18,
          colorid: "Pcolor5",
          cl: "linear-gradient(to right, #7f7fff, #7f7fff",
        },
        {
          id: 19,
          colorid: "Pcolor6",
          cl: "linear-gradient(to right, #7fbfff, #7fbfff)",
        },
        {
          id: 20,
          colorid: "Pcolor7",
          cl: "linear-gradient(to right, #7fffff, #7fffff)",
        },
        {
          id: 21,
          colorid: "Pcolor8",
          cl: "linear-gradient(to right, #84ffc1, #84ffc1)",
        },
        {
          id: 22,
          colorid: "Pcolor9",
          cl: "linear-gradient(to right, #7fff7f, #7fff7f)",
        },
        {
          id: 23,
          colorid: "Pcolor10",
          cl: "linear-gradient(to right, #bfff7f, #bfff7f)",
        },
        {
          id: 24,
          colorid: "Pcolor11",
          cl: "linear-gradient(to right, #ffff6f, #ffff6f)",
        },
        {
          id: 25,
          colorid: "Pcolor12",
          cl: "linear-gradient(to right, #ffbf7f, #ffbf7f)",
        },
        {
          id: 26,
          colorid: "Pcolor13",
          cl: "linear-gradient(to right, #dbf594, #dbf594)",
        },
        {
          id: 27,
          colorid: "Pcolor14",
          cl: "linear-gradient(to right, #878484a7, #878484a7)",
        },
        {
          id: 28,
          colorid: "Gcolor1",
          cl: "linear-gradient(to right, red, #ffb7b7)",
        },
        {
          id: 29,
          colorid: "Gcolor2",
          cl: "linear-gradient(to right, #ff007f, #ffb7db)",
        },
        {
          id: 30,
          colorid: "Gcolor3",
          cl: "linear-gradient(to right, #7f00ff, #ffb7ff)",
        },
        {
          id: 31,
          colorid: "Gcolor4",
          cl: "linear-gradient(to right, #0000ff, #cab7ff)",
        },
        {
          id: 32,
          colorid: "Gcolor5",
          cl: " linear-gradient(to right, #007fff, #b7dbff)",
        },
        {
          id: 33,
          colorid: "Gcolor6",
          cl: "linear-gradient(to right, #00ffff, #b7ffff)",
        },
        {
          id: 34,
          colorid: "Gcolor7",
          cl: "linear-gradient(to right, #00ff7f, #b7ffdb)",
        },
        {
          id: 35,
          colorid: "Gcolor8",
          cl: "linear-gradient(to right, #00ff00, #b7ffb7)",
        },
        {
          id: 36,
          colorid: "Gcolor9",
          cl: "linear-gradient(to right, #7fff00, #dbffb7)",
        },
        {
          id: 37,
          colorid: "Gcolor10",
          cl: "linear-gradient(to right, #ffff00, #ffffb7)",
        },
        {
          id: 38,
          colorid: "Gcolor11",
          cl: "linear-gradient(to right, #ff7f00, #ffdbb7)",
        },
        {
          id: 39,
          colorid: "Gcolor12",
          cl: "linear-gradient(to right, #ff5acd, #f3e1d0)",
        },
        {
          id: 40,
          colorid: "Gcolor13",
          cl: "linear-gradient(to right, #faaca8, #ddd6f3)",
        },
        {
          id: 41,
          colorid: "Gcolor14",
          cl: "linear-gradient(to right, #85ffbd, #fffb7d)",
        },
        {
          id: 42,
          colorid: "Mcolor1",
          cl: "linear-gradient(to right, red, yellow)",
        },
        {
          id: 43,
          colorid: "Mcolor2",
          cl: "linear-gradient(to right, #3eecac, #ee74e1)",
        },
        {
          id: 44,
          colorid: "Mcolor3",
          cl: " linear-gradient(to right, #00dbde, #fc00ff)",
        },
        {
          id: 45,
          colorid: "Mcolor4",
          cl: "linear-gradient(to right, #c850c0, #4158d0)",
        },
        {
          id: 46,
          colorid: "Mcolor5",
          cl: " linear-gradient(to right, #ff7f00, rgb(250, 250, 29))",
        },
        {
          id: 47,
          colorid: "Mcolor6",
          cl: "linear-gradient(to right, #f4d03f, #16a085)",
        },
        {
          id: 48,
          colorid: "Mcolor7",
          cl: "linear-gradient(to right, #52acff, #ffe32c)",
        },
        {
          id: 49,
          colorid: "Mcolor8",
          cl: "linear-gradient(to right, #fbab7e, #f7eb68)",
        },
        {
          id: 50,
          colorid: "Mcolor9",
          cl: "linear-gradient(to right, #fee140, #fa709a)",
        },
        {
          id: 51,
          colorid: "Mcolor10",
          cl: "linear-gradient(to right, #6284ff, #ff0000)",
        },
        {
          id: 52,
          colorid: "Mcolor11",
          cl: "linear-gradient(to right, #ffe53b, #ff2525)",
        },
        {
          id: 53,
          colorid: "Mcolor12",
          cl: "linear-gradient(to right, #f9ea3d, #f76b1c)",
        },
        {
          id: 54,
          colorid: "Mcolor13",
          cl: "linear-gradient(to right, #fa8bff, #2bd2ff, #2bff88)",
        },
        {
          id: 55,
          colorid: "Mcolor14",
          cl: "linear-gradient(to right, #4158d0, #c850c0, #ffcc70)",
        },
      ],
      selectedColor: {},
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
        color: doc.data().color,
      })
    })
    console.log(this.items)
    console.log(typeof this.items)
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
    // 608～649行目 さえちゃんの色機能のとこ
    irokinou: function () {
      if (this.colorArea) {
        this.colorArea = false
        console.log("色機能が消えた")
      } else {
        this.colorArea = true
        console.log("色機能が表示された")
      }
    },
    //ここを統一インターフェーズ
    colorBtn(colorId) {
      const targetColorIndex = this.colors.findIndex(
        (color) => color.id === colorId
      )
      console.log(targetColorIndex)
      this.bgColor.backgroundImage = this.colors[targetColorIndex].cl
      this.selectedColor = this.bgColor
    },
    async commentpush() {
      if (this.inputComment !== "") {
        const item = {
          text: this.inputComment,
          date: this.selectDate,
          time: this.selectedTime,
          time2: this.selectedTime2,
          date2: this.selectDate2,
          lastTime: this.selectedTimeLast,
          lastTime2: this.selectedTimeLast2,
          color: this.selectedColor,
        }
        this.items.push(item)
        console.log(this.inputComment)
        console.log(this.items)
        console.log("追加できてるよ")
        await addDoc(collection(db, "Schedule"), item)
        this.inputComment = ""
        this.inputMemo = ""
      }
    },
    edit() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else {
        this.inputComment = ""
      }
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
.li {
  list-style: none;
}
.itemColor {
  height: 30px;
  line-height: 30px;
}
.itemText {
}
.scheduleButton1 {
  margin-right: 20px;
}
.scheduleButton2 {
  margin-right: 20px;
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
/* 875～1260行目 さえちゃんの色機能のとこ */
.output {
  display: center;
  width: 100px;
  height: 50px;
  animation: bggradient 5s ease infinite;
}
.colorArea {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  justify-content: space-between;
}
.Palette {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  margin: 3%;
  justify-content: space-between;
}
/* デフォルトカラー */
.color {
  position: relative;
  right: 9px;
}
.color1 {
  width: 40px;
  height: 40px;
  background-color: rgb(233, 37, 37);
  border-radius: 50% 50% 0 50%;
}
.color2 {
  width: 40px;
  height: 40px;
  background-color: #ff007f;
  border-radius: 50% 50% 0 50%;
}
.color3 {
  width: 40px;
  height: 40px;
  background-color: #ff00ff;
  border-radius: 50% 50% 0 50%;
}
.color4 {
  width: 40px;
  height: 40px;
  background-color: #7f00ff;
  border-radius: 50% 50% 0 50%;
}
.color5 {
  width: 40px;
  height: 40px;
  background-color: rgb(183, 4, 183);
  border-radius: 50% 50% 0 50%;
}
.color6 {
  width: 40px;
  height: 40px;
  background-color: #0000ff;
  border-radius: 50% 50% 0 50%;
}
.color8 {
  width: 40px;
  height: 40px;
  background-color: #007fff;
  border-radius: 50% 50% 0 50%;
}
.color7 {
  width: 40px;
  height: 40px;
  background-color: #00ffff;
  border-radius: 50% 50% 0 50%;
}
.color9 {
  width: 40px;
  height: 40px;
  background-color: #00ff7f;
  border-radius: 50% 50% 0 50%;
}
.color10 {
  width: 40px;
  height: 40px;
  background-color: #00ff00;
  border-radius: 50% 50% 0 50%;
}
.color11 {
  width: 40px;
  height: 40px;
  background-color: greenyellow;
  border-radius: 50% 50% 0 50%;
}
.color12 {
  width: 40px;
  height: 40px;
  background-color: #ffff00;
  border-radius: 50% 50% 0 50%;
}
.color13 {
  width: 40px;
  height: 40px;
  background-color: #ff7f00;
  border-radius: 50% 50% 0 50%;
}
.color14 {
  width: 40px;
  height: 40px;
  background-color: rgb(56, 56, 56);
  border-radius: 50% 50% 0 50%;
}
/* パステルカラー */
.Pcolor1 {
  width: 40px;
  height: 40px;
  background-color: #ff7f7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor2 {
  width: 40px;
  height: 40px;
  background-color: #ff7fbf;
  border-radius: 50% 50% 0 50%;
}
.Pcolor3 {
  width: 40px;
  height: 40px;
  background-color: #ff7fff;
  border-radius: 50% 50% 0 50%;
}
.Pcolor4 {
  width: 40px;
  height: 40px;
  background-color: #bf7fff;
  border-radius: 50% 50% 0 50%;
}
.Pcolor5 {
  width: 40px;
  height: 40px;
  background-color: #7f7fff;
  border-radius: 50% 50% 0 50%;
}
.Pcolor6 {
  width: 40px;
  height: 40px;
  background-color: #7fbfff;
  border-radius: 50% 50% 0 50%;
}
.Pcolor7 {
  width: 40px;
  height: 40px;
  background-color: #7fffff;
  border-radius: 50% 50% 0 50%;
}
.Pcolor8 {
  width: 40px;
  height: 40px;
  background-color: #84ffc1;
  border-radius: 50% 50% 0 50%;
}
.Pcolor9 {
  width: 40px;
  height: 40px;
  background-color: #7fff7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor10 {
  width: 40px;
  height: 40px;
  background-color: #bfff7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor11 {
  width: 40px;
  height: 40px;
  background-color: #ffff6f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor12 {
  width: 40px;
  height: 40px;
  background-color: #ffbf7f;
  border-radius: 50% 50% 0 50%;
}
.Pcolor13 {
  width: 40px;
  height: 40px;
  background-color: #dbf594;
  border-radius: 50% 50% 0 50%;
}
.Pcolor14 {
  width: 40px;
  height: 40px;
  background-color: #878484a7;
  border-radius: 50% 50% 0 50%;
}
/* グラデーション */
.Gcolor1 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, red, #f6d0d0);
  border-radius: 50% 50% 0 50%;
}
.Gcolor2 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff007f, #fde6f2);
  border-radius: 50% 50% 0 50%;
}
.Gcolor3 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #7f00ff, #f6d3f6);
  border-radius: 50% 50% 0 50%;
}
.Gcolor4 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #0000ff, #e7e0fa);
  border-radius: 50% 50% 0 50%;
}
.Gcolor5 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #007fff, #d1e3f4);
  border-radius: 50% 50% 0 50%;
}
.Gcolor6 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00ffff, #dbfbfb);
  border-radius: 50% 50% 0 50%;
}
.Gcolor7 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00ff7f, #d2fde7);
  border-radius: 50% 50% 0 50%;
}
.Gcolor8 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00ff00, #d7f5d7);
  border-radius: 50% 50% 0 50%;
}
.Gcolor9 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #7fff00, #e3f2d4);
  border-radius: 50% 50% 0 50%;
}
.Gcolor10 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ffff00, #fbfbd3);
  border-radius: 50% 50% 0 50%;
}
.Gcolor11 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff7f00, #f3e1d0);
  border-radius: 50% 50% 0 50%;
}
.Gcolor12 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff5acd, #f3e1d0);
  border-radius: 50% 50% 0 50%;
}
.Gcolor13 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #faaca8, #ddd6f3);
  border-radius: 50% 50% 0 50%;
}
.Gcolor14 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #85ffbd, #fffb7d);
  border-radius: 50% 50% 0 50%;
}
/* ミックスカラー */
.Mcolor1 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, red, yellow);
  border-radius: 50% 50% 0 50%;
}
.Mcolor2 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #3eecac, #ee74e1);
  border-radius: 50% 50% 0 50%;
}
.Mcolor3 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #00dbde, #fc00ff);
  border-radius: 50% 50% 0 50%;
}
.Mcolor4 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #c850c0, #4158d0);
  border-radius: 50% 50% 0 50%;
}
.Mcolor5 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ff7f00, rgb(250, 250, 29));
  border-radius: 50% 50% 0 50%;
}
.Mcolor6 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #f4d03f, #16a085);
  border-radius: 50% 50% 0 50%;
}
.Mcolor7 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #52acff, #ffe32c);
  border-radius: 50% 50% 0 50%;
}
.Mcolor8 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #fbab7e, #f7eb68);
  border-radius: 50% 50% 0 50%;
}
.Mcolor9 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #fee140, #fa709a);
  border-radius: 50% 50% 0 50%;
}
.Mcolor10 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #6284ff, #ff0000);
  border-radius: 50% 50% 0 50%;
}
.Mcolor11 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #ffe53b, #ff2525);
  border-radius: 50% 50% 0 50%;
}
.Mcolor12 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #f9ea3d, #f76b1c);
  border-radius: 50% 50% 0 50%;
}
.Mcolor13 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #fa8bff, #2bd2ff, #2bff88);
  border-radius: 50% 50% 0 50%;
}
.Mcolor14 {
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to right, #4158d0, #c850c0, #ffcc70);
  border-radius: 50% 50% 0 50%;
}
.showColor {
  width: 40px;
  height: 40px;
  border-radius: 50% 50% 0 50%;
  margin: auto;
}
</style>
