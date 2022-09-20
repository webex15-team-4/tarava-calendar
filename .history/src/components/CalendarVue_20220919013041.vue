<template>
  <div class="calendar">
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
              <span v-on:click="commentRan">{{ dayNumber }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="commentKinou">
    <div class="commentRan">
      <textarea
        v-model="inputComment"
        @keydown.enter.shift.exact="keyDownEnterShift"
        class="textarea"
      />
      <br />
      <!-- ↑あえて書いてた\nの明示化を外した -->
      <div class="commentButton">
        <button v-on:click="comment(commentAreaId)">コメント</button>
        <button v-on:click="cancel">キャンセル</button>
        <button v-on:click="allDeletBtn(commentAreaId)">すべて消す</button>
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
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      year: 2021,
      month: 3,
      today: "",
      inputComment: "",
      items: [],
      commentKinou: false,
      containers: [
        { id: 0, text: "１", items: [] },
        { id: 1, text: "２", items: [] },
        { id: 2, text: "３", items: [] },
      ],
      commentAreaId: null,
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
  async created() {
    const q = query(collection(db, "Comment"))

    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      this.items.push({ text: doc.data().text })
    })
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
    async comment() {
      if (this.inputComment !== "") {
        this.containers.items.push({ text: this.inputComment })
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

    cancel() {
      if (this.inputComment !== "") {
        this.inputComment = ""
      } else this.inputComment === "", {}
      this.inputComment = ""
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
  widows: 750px;
  height: 25px;
}
.commentRan {
  border-top-style: double;
  border-bottom-style: double;
  border-right-style: double;
  border-left-style: double;
  border-color: aquamarine;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
}
</style>
